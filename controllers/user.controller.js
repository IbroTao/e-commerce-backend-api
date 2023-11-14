const { User } = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, mobile, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(400).json("Email already used, try another email.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
