const express = require("express");
const { upload } = require("../../utils/cloudinary");
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
} = require("../../controllers/admin/product-controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProducts);

module.exports = router;
