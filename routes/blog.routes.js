const { Router } = require("express");
const { verifyAndAuthorizeAuthor } = require("../middlewares/header");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
} = require("../controllers/blog.contoller");
const router = Router();

router.post("/create", verifyAndAuthorizeAuthor, createBlog);
router.put("/:id", verifyAndAuthorizeAuthor, updateBlog);
router.get("/all", verifyAndAuthorizeAuthor, getAllBlogs);
router.get("/:id", verifyAndAuthorizeAuthor, getSingleUser);
router.delete("/:id", verifyAndAuthorizeAuthor, deleteBlog);

module.exports = router;
