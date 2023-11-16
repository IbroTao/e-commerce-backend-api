const { Router } = require("express");
const {
  registerUser,
  loginUser,
  fetchSingleUser,
  fetchAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
} = require("../middlewares/header");
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", verifyUser, fetchSingleUser);
router.get("/all", verifyAndAuthorizeAdmin, fetchAllUsers);
router.put("/update/:id", verifyAndAuthorizeUser, updateUser);
router.delete("/delete/:id", verifyAndAuthorizeUser, deleteUser);

module.exports = router;
