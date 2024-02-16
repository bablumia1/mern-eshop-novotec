import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";
import productReducer from "../slices/products/productSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import brandsReducer from "../slices/brands/brandSlice";
import colorsReducer from "../slices/colors/colorSlice";
import couponReducer from "../slices/coupon/couponSlice";
import reviewReducer from "../slices/reviews/reviewSlice";
import cartReducer from "../slices/products/cartSlice";
import ordersReducer from "../slices/orders/oderSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    coupons: couponReducer,
    reviews: reviewReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
