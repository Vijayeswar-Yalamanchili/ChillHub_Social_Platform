import React from 'react'
import { Navigate } from 'react-router-dom'

function UserProtectedRoute({children}) {
    // let role = localStorage.getItem('role')
    let token = localStorage.getItem('token')
    // return role==='user' ? children : <Navigate to='/' />
    return token? children : <Navigate to='/'/>
}

export default UserProtectedRoute