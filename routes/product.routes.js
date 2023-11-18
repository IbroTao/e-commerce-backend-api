const { Router } = require("express");
const { verifyUser } = require("../middlewares/header");
const { createProduct } = require("../controllers/product.controller");
const router = Router();

router.post("/create", verifyUser, createProduct);

module.exports = router;
