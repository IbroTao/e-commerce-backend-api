const { Product } = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { quantity, description, price, title } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        quantity,
        description,
        price,
        title,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find().sort({
      createdAt: "asc",
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
