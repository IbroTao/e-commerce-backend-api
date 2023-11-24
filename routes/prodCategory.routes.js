const { Router } = require("express");
const {
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
} = require("../middlewares/header");
const {
  createCategory,
  updateCategory,
  deleteCategory,
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

module.exports = router;
