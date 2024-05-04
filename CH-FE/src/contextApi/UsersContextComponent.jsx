import React, {useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode"
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

export const UserContext = React.createContext()

function UsersContextComponent({children}) {

    const [user,setUser] = useState([])
    
    const getUsers = async() => {
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            let result = res.data.getusers
            let currentUser = result.filter((user)=> user._id === id)
            if(res.status === 200){
                setUser(currentUser)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(()=>{
        getUsers()
    },[])

    return <>
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    </>
}

export default UsersContextComponent