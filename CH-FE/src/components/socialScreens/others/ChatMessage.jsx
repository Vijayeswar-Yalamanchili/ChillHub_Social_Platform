import React from 'react'
import { jwtDecode } from "jwt-decode"
import { Image } from 'react-bootstrap'
import { format } from 'timeago.js'
import userPic from '../../../assets/svg/userProfilePic.svg'

function ChatMessage({message,own}) {

    const isLoggedIn = true
    let tokenForUsername = localStorage.getItem('loginToken')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

    return <>
        <div className={own ? "message own m-2" : "message m-2"}>
            <div className="messageBlock">
                {/* {
                    user?.imageDP ? <Image src={`https://chillhub-social-platform.onrender.com/${user.imageDP}`} style={{padding: "5px"}} className='chatUserDp me-3' roundedCircle/> 
                    : <Image src={userPic} style={{padding: "5px"}} className='chatUserDp me-3' roundedCircle/>
                } */}
                <div className='d-flex flex-column'>
                    <p className="messageDisplay px-2 py-1 mb-0">
                        {message.text}
                    </p>
                    <div className='messageBottom'>{format(message.createdAt)}</div>
                </div>
            </div>            
            
        </div>
    </>
}

export default ChatMessage