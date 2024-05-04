import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

function UserProtectedRoute({children}) {
    let token = localStorage.getItem('loginToken')
    const decodedToken = jwtDecode(token)
    return decodedToken.role==='user'? children : <Navigate to='/'/>;
}

export default UserProtectedRoute