import React, { useState,useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import userPic from '../../../assets/svg/userProfilePic.svg'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function Conversation({conversation,currentUserId}) {

    const [user, setUser] = useState('')
    let getToken = localStorage.getItem('loginToken')
    const isLoggedIn = true

    const friendId = conversation.members.find((m)=> m !== currentUserId)

    const getUserId = async() => {
        try {            
            const res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}?userId=${friendId}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            setUser(res.data.getusers)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    
    useEffect(()=> {
        getUserId()
    },[conversation,currentUserId])


    return <>
        {
            // isLoggedIn !== (!user?.isLoggedIn) ? 
              ( user?.imageDP  ? <Image src={`https://chillhub-social-platform.onrender.com/${user.imageDP}`} className='chatWrapperDp me-3' roundedCircle/>:
                <Image src={userPic} style={{padding: "5px"}} className='chatWrapperDp p-1 me-3' roundedCircle/> 
              ) 
            // : <Image src={userPic} style={{padding: "5px"}} className='chatWrapperDp p-1 me-3' roundedCircle/>
        }
        <div style={{fontSize : "0.8em"}}>
            <div className='mb-0'>{user?.firstName} {user?.lastName}</div>
            <p className='mb-0'>{user?.isLoggedIn === true ? <div style={{color : "green"}}>online</div> : null}</p>
        </div>
    </>
}

export default Conversation