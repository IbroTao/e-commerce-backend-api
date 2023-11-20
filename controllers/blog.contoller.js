const { Blog } = require("../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(200).json("Blog created");
  } catch (err) {
    res.status(500).json(err);
  }
};

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

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Blog deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().sort({
      createdAt: "desc",
    });
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
