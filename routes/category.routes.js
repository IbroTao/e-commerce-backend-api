const { Router } = require("express");
const {
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
} = require("../middlewares/header");
const { createCategory } = require("../controllers/category.controller");
const router = Router();

router.post(
  "/create",
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
  createCategory
);

module.exports = router;
