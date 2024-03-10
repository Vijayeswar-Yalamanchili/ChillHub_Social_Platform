import React from "react";
import Login from "../components/signup-signIn-frgtPwd/Login";
import Register from "../components/signup-signIn-frgtPwd/Register";
import ForgotPassword from "../components/signup-signIn-frgtPwd/ForgotPassword"
import ResetPassword from "../components/signup-signIn-frgtPwd/ResetPassword";
import VerifyPassword from "../components/signup-signIn-frgtPwd/VerifyPassword";
import Home from "../components/socialScreens/Home"
import Events from "../components/socialScreens/Events"
import FindFriends from "../components/socialScreens/FindFriends"
import Messages from "../components/socialScreens//Messages"
import UserProtectedRoute from "./UserProtectedRoute";
import { Navigate } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import MyTimeline from "../components/socialScreens/MyTimeline";

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
        path:'/forgotpassword/:id/verify/:token',
        element : <VerifyPassword/>,
        exact:true
    },
    {
        path : '/resetPassword',
        element : <ResetPassword/>,
        exact: true
    },
    {
        path:'/home',
        element : <UserProtectedRoute><Home/></UserProtectedRoute>,
        exact:true
    },
    {
        path:'/mytimeline',
        element : <MyTimeline/>,
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
        path:'/error',
        element : <ErrorScreen/>,
        exact:true
    },
    {
        path:'*',
        element : <Navigate to={'/'}/>,
        exact:true
    }
]

export default AppRoutes