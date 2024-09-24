import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin-slice/products-slice";
import adminOrderSlice from "./admin-slice/order-slice";
import commonFeatureSlice from "./common-slice";
import shopProductsSlice from "./products-slice";
import shopReviewSlice from "./review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    commonFeature: commonFeatureSlice,
    shopProducts: shopProductsSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
