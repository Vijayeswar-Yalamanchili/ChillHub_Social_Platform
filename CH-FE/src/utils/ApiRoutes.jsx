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
        authenticate : true
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
    ADDUSERBIO : {
        path : '/home/adduserdatas',
        authenticate : true
    },
    GETUSERBIO : {
        path : '/home/getuserdatas',
        authenticate : true
    },
    POSTREACTION : {
        path : '/home/updatePostReaction',
        authenticate :true
    }
}

export default ApiRoutes