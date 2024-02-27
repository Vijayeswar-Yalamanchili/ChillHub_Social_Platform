const ApiRoutes = {
    LOGIN : {
         path : '/',
         authenticate : false
    },
    REGISTER : {
        path : '/register',
        authenticate : false
    },
    FORGOTPASSWORD : {
        path : '/forgotPassword',
        authenticate : false
    },
    GETALLUSERS : {
        path : '/user',
        authenticate : true
    }
}

export default ApiRoutes