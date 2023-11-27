const { blogCategory } = require("../models/blogCategory.model");

const createBlogCategory = async (req, res) => {
  try {
    const category = await blogCategory.create(req.body);
    res.status(200).json("Blog category created");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBlogCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await blogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json("Blog category updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteBlogCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await blogCategory.findByIdAndDelete(id);
    res.status(200).json("Blog category deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBlogCategory = async (req, res) => {
  try {
    const category = await blogCategory.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllBlogCategory = async (req, res) => {
  try {
    const category = await blogCategory.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getBlogCategory,
  getAllBlogCategory,
};
