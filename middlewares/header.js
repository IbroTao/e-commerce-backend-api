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

const verifyAndAuthorizeUser = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.sub === req.params.id) {
      next();
    } else res.status(200).json("Permission denied, try again");
  });
};

const verifyAndAuthorizeAdmin = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else res.status(403).json("Permission denied");
  });
};

const verifyAndAuthorizeAuthor = async (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.isAuthor) {
      next();
    } else res.status(403).json("Permission denied");
  });
};

module.exports = {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
  verifyAndAuthorizeAuthor,
};
