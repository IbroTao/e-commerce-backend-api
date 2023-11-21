const { Blog } = require("../models/blog.model");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json("Blog created");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  const { title, description, author, category } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      description,
      author,
      category,
    });
    res.status(200).json("Blog updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET BLOG
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL BLOGS
const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().sort({
      createdAt: "desc",
    });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
};
