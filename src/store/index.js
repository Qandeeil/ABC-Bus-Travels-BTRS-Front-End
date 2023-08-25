import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Registration/SignUp';
import LoginSlice from "./Registration/Login";

const store = configureStore({reducer: {
    users: userSlice,
    checkLogin: LoginSlice
}})

export default store