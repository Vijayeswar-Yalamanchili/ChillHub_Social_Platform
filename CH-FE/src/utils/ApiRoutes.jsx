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
    HOME : {
        path : '/home',
        authenticate : false
    },
    ADDPOST : {
        path : '/home/addpost',
        authenticate : false
    },
    GETALLUSERS : {
        path : '/user',
        authenticate : true
    }
}

export default ApiRoutes