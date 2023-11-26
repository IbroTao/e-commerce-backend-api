const { Router } = require("express");
const {
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  verifyUser,
} = require("../middlewares/header");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controllers/prodCategory.controller");
const router = Router();

router.post(
  "/create",
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  createCategory
);
router.put(
  "/update/:id",
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  updateCategory
);
router.delete(
  "/delete/:id",
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  deleteCategory
);

router.get(
  "/all",
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  getAllCategory
);
router.get("/:id", verifyUser, restrictBlockedUser, getCategory);

module.exports = router;
