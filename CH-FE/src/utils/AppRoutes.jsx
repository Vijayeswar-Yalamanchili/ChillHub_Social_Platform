import React from "react";
import Login from "../components/signup-signIn-frgtPwd/Login";
import Register from "../components/signup-signIn-frgtPwd/Register";
import ForgotPassword from "../components/signup-signIn-frgtPwd/ForgotPassword"
import Home from "../components/socialScreens/Home"
import Events from "../components/socialScreens/Events"
import FindFriends from "../components/socialScreens/FindFriends"
import Messages from "../components/socialScreens//Messages"

import { Navigate } from "react-router-dom";

const AppRoutes = [
    {
        path:'/',
        element : <Login/>,
        exact:true
    },
    {
        path:'/register',
        element : <Register/>,
        exact:true
    },
    {
        path:'/forgotpassword',
        element : <ForgotPassword/>,
        exact:true
    },
    {
        path:'/home',
        element : <Home/>,
        exact:true
    },
    {
        path:'/events',
        element : <Events/>,
        exact:true
    },
    {
        path:'/findfriends',
        element : <FindFriends/>,
        exact:true
    },
    {
        path:'/messages',
        element : <Messages/>,
        exact:true
    },
    {
        path:'*',
        element : <Navigate to={'/'}/>,
        exact:true
    }
]

export default AppRoutes