const jwt = require("jsonwebtoken");

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

const verifyAndAuthorizeAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else res.status(401).json("You are not authorized");
  });
};

module.exports = {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
};
