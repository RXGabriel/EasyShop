const express = require("express");
const { upload } = require("../../utils/cloudinary");
const {
  handleImageUpload,
} = require("../../controllers/admin/product-controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

module.exports = router;
