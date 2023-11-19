const { Router } = require("express");
const {
  verifyUser,
  verifyAndAuthorizeAdmin,
} = require("../middlewares/header");
const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const router = Router();

router.get("/:id", verifyUser, getProduct);
router.get("/", verifyAndAuthorizeAdmin, getAllProducts);
router.post("/create", verifyUser, createProduct);
router.put("/:id", verifyUser, updateProduct);
router.delete("/:id", verifyUser, deleteProduct);

module.exports = router;
