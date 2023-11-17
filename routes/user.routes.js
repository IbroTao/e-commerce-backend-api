const {
  registerUser,
  loginUser,
  updateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
} = require("../controllers/user.controller");
const {
  verifyAndAuthorizeAdmin,
  verifyAndAuthorizeUser,
  verifyUser,
} = require("../middlewares/header");

const router = require("express").Router();

router.get("/users", verifyAndAuthorizeAdmin, getAllUsers);
router.get("/user/:id", verifyUser, getSingleUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", verifyAndAuthorizeUser, updateUser);
router.put("/block/:id", verifyAndAuthorizeAdmin, blockUser);
router.put("/unblock/:id", verifyAndAuthorizeAdmin, unblockUser);
router.delete("/delete/:id", verifyUser, deleteUser);

module.exports = router;
