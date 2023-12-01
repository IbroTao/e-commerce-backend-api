const { Router } = require("express");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controller");
const {
  restrictBlockedUser,
  verifyAndAuthorizeAdmin,
  verifyUser,
} = require("../middlewares/header");
const router = Router();

router.post("/create", verifyUser, verifyAndAuthorizeAdmin, createCoupon);
router.get("/all", verifyUser, verifyAndAuthorizeAdmin, getAllCoupons);
router.put("/:id", verifyUser, verifyAndAuthorizeAdmin, updateCoupon);
router.delete("/:id", verifyUser, verifyAndAuthorizeAdmin, deleteCoupon);

module.exports = router;
