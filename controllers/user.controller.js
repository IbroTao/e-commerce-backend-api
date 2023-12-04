const { hashSync, compareSync, compare, hash } = require("bcryptjs");
const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./email.contoller");
const asyncHandler = require("express-async-handler");
const { validateMongoId } = require("../utilis/validateMongoId");
const { generateToken } = require("../configs/generateToken");
const { generateRefreshToken } = require("../configs/refreshToken");

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, mobile, email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      mobile,
      password: hashSync(password, 10),
    });
    res.status(201).json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const comparePassword = compareSync(password, user.password);
  if (user && comparePassword) {
    const refreshToken = await generateRefreshToken(user._id);
    const updateUser = await User.findByIdAndUpdate(
      user.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      user: user,
      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

// HANDLE REFRESH TOKEN
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh Token attached to User");
  jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Wrong refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, mobile, email } = req.body;
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findByIdAndUpdate(id, {
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
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET A SINGLE USER
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL USERS
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
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
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
  const { id } = req.params;
  validateMongoId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
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
  validateMongoId(id);
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
  handleRefreshToken,
  logoutUser,
};
