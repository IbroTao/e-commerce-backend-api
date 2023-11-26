const { Router } = require("express");
const { verifyUser, restrictBlockedUser } = require("../middlewares/header");
const {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getAllBlogCategory,
} = require("../controllers/blogCategory");
const router = Router();

router.post("/create", verifyUser, restrictBlockedUser, createBlogCategory);
router.put("/:id", verifyUser, restrictBlockedUser, updateBlogCategory);
router.delete("/:id", verifyUser, restrictBlockedUser, deleteBlogCategory);
router.get("/all", verifyUser, restrictBlockedUser, getAllBlogCategory);
router.get("/:id", verifyUser, restrictBlockedUser, getBlogCategory);

module.exports = router;
