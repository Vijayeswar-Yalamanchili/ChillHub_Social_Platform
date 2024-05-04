import React from "react"
import Login from "../components/signup-signIn-frgtPwd/Login"
import Register from "../components/signup-signIn-frgtPwd/Register"
import ForgotPassword from "../components/signup-signIn-frgtPwd/ForgotPassword"
import ResetPassword from "../components/signup-signIn-frgtPwd/ResetPassword"
import VerifyPassword from "../components/signup-signIn-frgtPwd/VerifyPassword"
import Home from "../components/socialScreens/Home"
import Events from "../components/socialScreens/Events"
import Friends from "../components/socialScreens/Friends"
import Messages from "../components/socialScreens//Messages"
import UserProtectedRoute from "./UserProtectedRoute"
import ErrorScreen from "../components/ErrorScreen"
import MyProfile from "../components/socialScreens/MyProfile"
import UsersContextComponent from "../contextApi/UsersContextComponent"

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
        path:'/myprofile',
        element : <MyProfile/>,
        exact:true
    },
    {
        path:'/events',
        element : <Events/>,
        exact:true
    },
    {
        path:'/friends',
        element : <Friends/>,
        exact:true
    },
    {
        path:'/messages',
        element : <UsersContextComponent><Messages/></UsersContextComponent>,
        exact:true
    },
    {
        path:'/error',
        element : <ErrorScreen/>,
        exact:true
    },
    {
        path:'*',
        element : <ErrorScreen/>,
        exact:true
    }
    // {
    //     path:'*',
    //     element : <Navigate to={'/'}/>,
    //     exact:true
    // }
]

export default AppRoutes