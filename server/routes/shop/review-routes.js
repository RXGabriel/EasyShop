const express = require("express");
const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

router.get("/:productId", getProductReviews);
router.post("/add", addProductReview);

module.exports = router;
