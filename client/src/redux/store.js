import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import programReducer from "./washingProgramSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        programs: programReducer,
        orders: orderReducer
    }
});