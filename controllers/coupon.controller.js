const { Coupon } = require("../models/coupon.model");

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createCoupon };
