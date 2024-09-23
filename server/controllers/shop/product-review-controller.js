const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");
const Product = require("../../models/Product");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "Voce precisa comprar o produto para fazer um comentário",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });
    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "Você já fez um comentário neste produto",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reducer((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao adicionar o comentário",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao recuperar os comentários",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
