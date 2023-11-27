const { Router } = require("express");
const {
  verifyUser,
  verifyAndAuthorizeAdmin,
  restrictBlockedUser,
} = require("../middlewares/header");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rateProduct,
} = require("../controllers/product.controller");
const router = Router();

router.get("/", verifyAndAuthorizeAdmin, getAllProducts);
router.get("/:id", verifyUser, getProduct);
router.post("/create", verifyAndAuthorizeAdmin, createProduct);
router.put("/rating", verifyUser, restrictBlockedUser, rateProduct);
router.put("/wishlist", verifyUser, restrictBlockedUser, addToWishlist);
router.put("/:id", verifyUser, verifyAndAuthorizeAdmin, updateProduct);
router.delete("/:id", verifyUser, verifyAndAuthorizeAdmin, deleteProduct);

module.exports = router;
