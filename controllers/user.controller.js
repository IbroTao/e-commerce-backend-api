const { sign } = require("jsonwebtoken");
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");

// REGISTER A USER
const registerUser = async (req, res) => {
  const { firstname, lastname, mobile, email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(400).json("Email already used, try another email.");
    } else {
      // CREATE NEW USER
      const user = await User.create({
        firstname,
        lastname,
        email,
        mobile,
        password: bcrypt.hashSync(password, 11),
      });
      res.status(200).json("User registered");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN A USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json("Email not found");

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) res.status(400).json("Wrong Password");

    const accessToken = sign(
      {
        sub: user._id,
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
  } catch (err) {
    res.status(500).json(err);
  }
};

// FETCH ALL USERS
const fetchAllUsers = async (req, res) => {
  try {
    const user = await User.find().sort({
      createdAt: "desc",
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// FETCH A SINGLE USER
const fetchSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(["-password"]);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE A USER
const updateUser = async (req, res) => {
  const { firstname, lastname, mobile, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      ({
        firstname: req.body,
        lastname: req.body,
        email: req.body,
        mobile: req.body,
      },
      {
        new: true,
      })
    );
    res.status(200).json("User updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE A USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers,
  fetchSingleUser,
  updateUser,
  deleteUser,
};
