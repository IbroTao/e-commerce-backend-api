const { Router } = require("express");
const {
  verifyAndAuthorizeAuthor,
  verifyUser,
} = require("../middlewares/header");
const { restrictBlockedUser } = require("../middlewares/header");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
  likeBlog,
  dislikeBlog,
} = require("../controllers/blog.contoller");
const router = Router();

router.post(
  "/create",
  verifyAndAuthorizeAuthor,
  restrictBlockedUser,
  createBlog
);
router.put("/like", verifyUser, restrictBlockedUser, likeBlog);
router.put("/dislike", verifyUser, restrictBlockedUser, dislikeBlog);
router.put("/:id", verifyAndAuthorizeAuthor, restrictBlockedUser, updateBlog);
router.get("/all", verifyAndAuthorizeAuthor, restrictBlockedUser, getAllBlogs);
router.get("/:id", verifyUser, restrictBlockedUser, getSingleBlog);
router.delete(
  "/:id",
  verifyAndAuthorizeAuthor,
  restrictBlockedUser,
  deleteBlog
);

module.exports = router;
