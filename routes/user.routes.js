const { Router } = require("express");
const {
  registerUser,
  loginUser,
  fetchSingleUser,
  fetchAllUsers,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
} = require("../controllers/user.controller");
const {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAdmin,
} = require("../middlewares/header");
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", verifyUser, fetchSingleUser);
router.get("/all", fetchAllUsers);
router.put("/update/:id", verifyAndAuthorizeUser, updateUser);
router.put("/block/:id", verifyAndAuthorizeUser, verifyAdmin, blockUser);
router.put("/unblock/:id", verifyAndAuthorizeUser, verifyAdmin, unblockUser);
router.delete("/delete/:id", verifyAndAuthorizeUser, deleteUser);

module.exports = router;
