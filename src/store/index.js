import { configureStore } from "@reduxjs/toolkit";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Accounts from "./Registration/Accounts";
import Trips from "./Trips/Trips";

const store = configureStore({reducer: {
    Login,
    SignUp,
    Accounts,
    Trips
}})

export default store