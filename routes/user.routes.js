const { Router } = require("express");
const {
  registerUser,
  loginUser,
  fetchSingleUser,
  fetchAllUsers,
} = require("../controllers/user.controller");
const {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
} = require("../middlewares/header");
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", verifyUser, fetchSingleUser);
router.get("/user/all", verifyAndAuthorizeAdmin, fetchAllUsers);

module.exports = router;
