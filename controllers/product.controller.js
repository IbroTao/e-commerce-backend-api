const { Product } = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createProduct };
