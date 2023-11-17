const { hashSync, compareSync } = require("bcryptjs");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");

// REGISTERING USER(S)
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, mobile, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) res.status(400).json("Email already used, try another email");
    await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hashSync(password, 11),
    });
    res.status(201).json("User registered");
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGGING IN USER(S)
const loginUser = async (req, res) => {
  try {
    const { firstname, lastname, mobile, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("Wrong Email");
    } else {
      const comparePassword = compareSync(password, user.password);
      if (!comparePassword) {
        res.status(404).json("Wrong Password");
      } else {
        const accessToken = await jwt.sign(
          {
            sub: user._id,
            role: user.role,
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
};

// UPDATE USER
const updateUser = async (req, res) => {
  const { firstname, lastname, mobile, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body,
        lastname: req.body,
        mobile: req.body,
        email: req.body,
        password: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json("User info changed and updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

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

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
  blockUser,
  unblockUser,
};
