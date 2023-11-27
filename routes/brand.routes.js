const { Router } = require("express");
const router = Router();
const { verifyUser } = require("../middlewares/header");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
  getBrand,
} = require("../controllers/brand.controller");

router.post("/create", verifyUser, createBrand);
router.put("/:id", verifyUser, updateBrand);
router.delete("/:id", verifyUser, deleteBrand);
router.get("/all", verifyUser, getAllBrand);
router.get("/:id", verifyUser, getBrand);

module.exports = router;
