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
    RESETPASSWORD : {
        path : '/resetPassword',
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
    GETUSERPOST :{
        path : '/home/getuserposts',
        authenticate : true
    },
    GETPOST : {
        path : '/home/getposts',
        authenticate : true
    },
    DELETEUSERPOST : {
        path : '/home/deleteuserpost',
        authenticate : true
    },
}

export default ApiRoutes