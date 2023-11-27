const { Brand } = require("../models/brand.model");

const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllBrand = async (req, res) => {
  try {
    const brand = await Brand.find();
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
