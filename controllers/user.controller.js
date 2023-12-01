const { hashSync, compareSync, compare, hash } = require("bcryptjs");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./email.contoller");
const session = require("express-session");
const asyncHandler = require("express-async-handler");

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, mobile, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hashSync(password, 10),
    });
    res.status(201).json("User registered");
  } else {
    throw new Error("User already exists");
  }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("User not found");
    } else {
      const comparePassword = compareSync(password, user.password);
      console.log(comparePassword);
      if (!comparePassword) {
        res.status(400).json("Incorrect password(s).");
      } else {
        const accessToken = await jwt.sign(
          {
            sub: user._id,
            role: user.role,
            isAuthor: user.isAuthor,
            isBlocked: user.isBlocked,
          },
          process.env.SECRET,
          {
            expiresIn: "3d",
          }
        );

        const returnUser = await User.findById(user._id).select(["-password"]);
        res.status(200).json({
          user: returnUser,
          token: accessToken,
        });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//LOGOUT USER

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, mobile, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstname,
      lastname,
      mobile,
      email,
    });
    res.status(200).json("User info changed and updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GETTING A SINGLE USER
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GETTING ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().sort({
      createdAt: "desc",
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// BLOCK A USER
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.status(200).json("User has been blocked");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UNBLOCK A USER
const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.status(200).json("User has been unblocked");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER PASSWORD
const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      const comparePassword = await compare(oldPassword, user.password);
      if (comparePassword) {
        user.password = await hash(newPassword, 10);
        const updatedUser = await user.save();
        res.status(200).json("Password reset");
      }
    } else {
      res.status(401).json("Incorrect old password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// NOTIFY USERS
const notifyUsers = async (req, res) => {
  const { email, text, subject, html } = req.body;
  try {
    const data = {
      to: email,
      text: text,
      subject: subject,
      html: html,
    };
    sendEmail(data);
    res.status(200).json("Email sent!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  blockUser,
  unblockUser,
  updatePassword,
  notifyUsers,
};
