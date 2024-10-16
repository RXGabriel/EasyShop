const express = require("express");
const connectDB = require("./utils/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/product-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error.message);
  });

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);

app.get("/", (req, res) => {
  res.send("API rodando");
});
