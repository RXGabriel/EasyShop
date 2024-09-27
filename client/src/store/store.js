import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin-slice/products-slice";
import adminOrderSlice from "./admin-slice/order-slice";
import commonFeatureSlice from "./common-slice";
import shopProductsSlice from "./shop-slice/products-slice";
import shopCartSlice from "./shop-slice/cart-slice";
import shopReviewSlice from "./shop-slice/review-slice";
import shopSearchSlice from "./shop-slice/search-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    commonFeature: commonFeatureSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopReview: shopReviewSlice,
    shopSearch: shopSearchSlice,
  },
});

export default store;
