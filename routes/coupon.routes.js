const { Router } = require("express");
const { createCoupon } = require("../controllers/coupon.controller");
const router = Router();

router.post("/create", createCoupon);

module.exports = router;
