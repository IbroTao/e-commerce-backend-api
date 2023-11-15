const { sign } = require("jsonwebtoken");
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");

// REGISTER A USER
const registerUser = async (req, res) => {
  try {
    // USER DATA REQUEST
    const { firstname, lastname, mobile, email, password } = req.body;
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
  try {
    const { email, password } = req.body;
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

module.exports = { registerUser, loginUser, fetchAllUsers, fetchSingleUser };
