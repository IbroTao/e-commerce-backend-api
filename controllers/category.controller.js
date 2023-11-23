const { Category } = require("../models/category.model");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createCategory };
