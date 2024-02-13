const ApiRoutes = {
    LOGIN : {
         path : '/',
         authenticate : false
    },
    REGISTER : {
        path : '/register',
        authenticate : false
    },
    GETALLUSERS : {
        path : '/user',
        authenticate : true
    }
}

export default ApiRoutes