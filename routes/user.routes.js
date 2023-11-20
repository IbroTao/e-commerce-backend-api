const {
  registerUser,
  loginUser,
  updateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  notifyUser,
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
router.post("/update/:id", verifyUser, updatePassword);
router.post("/notify", verifyUser, notifyUser);
router.put("/change/:id", verifyAndAuthorizeUser, updateUser);
router.put("/block/:id", verifyAndAuthorizeAdmin, blockUser);
router.put("/unblock/:id", verifyAndAuthorizeAdmin, unblockUser);
router.delete("/delete/:id", verifyUser, deleteUser);

module.exports = router;
