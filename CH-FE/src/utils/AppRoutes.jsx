import React, { lazy, Suspense } from "react"
import UserProtectedRoute from "./UserProtectedRoute"
import UsersContextComponent from "../contextApi/UsersContextComponent"
import LoadingComponent from '../components/LoadingComponent'
import ErrorScreen from "../components/ErrorScreen"

const LoginPage = lazy(()=> import('../components/signup-signIn-frgtPwd/Login'))
const RegisterPage = lazy(()=> import('../components/signup-signIn-frgtPwd/Register'))
const ForgotPasswordPage = lazy(()=> import('../components/signup-signIn-frgtPwd/ForgotPassword'))
const ResetPasswordPage = lazy(()=> import('../components/signup-signIn-frgtPwd/ResetPassword'))
const VerifyPasswordPage = lazy(()=> import('../components/signup-signIn-frgtPwd/VerifyPassword'))
const HomePage = lazy(()=> import('../components/socialScreens/Home'))
const EventsPage = lazy(()=> import('../components/socialScreens/Events'))
const FriendsPage = lazy(()=> import('../components/socialScreens/Friends'))
const MessagesPage = lazy(()=> import('../components/socialScreens/Messages'))
const MyProfilePage = lazy(()=> import('../components/socialScreens/MyProfile'))

const AppRoutes = [
    {
        path:'/',
        element : <Suspense fallback={<LoadingComponent/>}><LoginPage/></Suspense>,
        exact:true
    },
    {
        path:'/register',
        element : <Suspense fallback={<LoadingComponent/>}><RegisterPage/></Suspense>,
        exact:true
    },
    {
        path:'/forgotpassword',
        element : <Suspense fallback={<LoadingComponent/>}><ForgotPasswordPage/></Suspense>,
        exact:true
    },
    {
        path:'/forgotpassword/:id/verify/:token',
        element : <Suspense fallback={<LoadingComponent/>}><VerifyPasswordPage/></Suspense>,
        exact:true
    },
    {
        path : '/resetPassword',
        element : <Suspense fallback={<LoadingComponent/>}><ResetPasswordPage/></Suspense>,
        exact: true
    },
    {
        path:'/home',
        element : <Suspense fallback={<LoadingComponent/>}><UserProtectedRoute><UsersContextComponent><HomePage/></UsersContextComponent></UserProtectedRoute></Suspense>,
        exact:true
    },
    {
        path:'/myprofile',
        element : <Suspense fallback={<LoadingComponent/>}><UsersContextComponent><MyProfilePage/></UsersContextComponent></Suspense>,
        exact:true
    },
    {
        path:'/events',
        element : <Suspense fallback={<LoadingComponent/>}><UsersContextComponent><EventsPage/></UsersContextComponent></Suspense>,
        exact:true
    },
    {
        path:'/friends',
        element : <Suspense fallback={<LoadingComponent/>}><UsersContextComponent><FriendsPage/></UsersContextComponent></Suspense>,
        exact:true
    },
    {
        path:'/messages',
        element : <Suspense fallback={<LoadingComponent/>}><UsersContextComponent><MessagesPage/></UsersContextComponent></Suspense>,
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
]

export default AppRoutes