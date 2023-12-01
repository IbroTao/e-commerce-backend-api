const { Coupon } = require("../models/coupon.model");

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      msg: "Coupon updated",
      coupon,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createCoupon, getAllCoupons, updateCoupon };
