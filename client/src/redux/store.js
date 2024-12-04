import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
// import userReducer from './slices/userSlice';
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
