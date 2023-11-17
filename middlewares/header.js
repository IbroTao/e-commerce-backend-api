const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const accessToken = jwt.verify(token, process.env.SECRET);
    req.user = accessToken;
    if (accessToken) {
      next();
    } else res.status(403).json("You are not authorized");
  } else res.status(401).json("Add authorization header");
};

module.exports = { verifyUser };
