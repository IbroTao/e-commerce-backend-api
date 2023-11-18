const { Product } = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      quantity,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createProduct };
