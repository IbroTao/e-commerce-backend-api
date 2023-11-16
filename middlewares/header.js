const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const accessToken = await jwt.verify(token, process.env.SECRET);
    req.user = accessToken;
    if (accessToken) {
      next();
    } else res.status(403).json("Invalid token");
  } else {
    res.status(401).json("Please add authorization header");
  }
};

const verifyAndAuthorizeUser = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.sub === req.params.id) {
      next();
    } else res.status(401).json("You are not authorized");
  });
};

const verifyAdmin = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.role !== "admin") {
    res.status(403).json("You are not an admin");
  } else {
    next();
  }
};

module.exports = {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAdmin,
};
