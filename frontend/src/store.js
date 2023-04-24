import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import revenueReducer from "./slice/revenueSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        revenue: revenueReducer,
    },
});
