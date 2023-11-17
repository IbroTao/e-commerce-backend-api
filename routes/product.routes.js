const { Router } = require("express");
const { verifyAndAuthorizeUser } = require("../middlewares/header");
const { createProduct } = require("../controllers/product.controller");
const router = Router();

router.post("/create", verifyAndAuthorizeUser, createProduct);

module.exports = router;
