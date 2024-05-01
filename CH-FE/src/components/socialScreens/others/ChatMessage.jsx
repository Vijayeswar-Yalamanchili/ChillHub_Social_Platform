import React from 'react'
import { jwtDecode } from "jwt-decode"
import { Image } from 'react-bootstrap'
import userPic from '../../../assets/svg/userProfilePic.svg'

function ChatMessage({own}) {

    const isLoggedIn = true
    let tokenForUsername = localStorage.getItem('loginToken')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

    return <>
        <div className={own ? "message own m-2" : "message m-2"}>
            <div className="messageBlock">
                {
                isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                    (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                    <Image src={userPic} style={{padding: "5px"}} className='chatUserDp me-3' roundedCircle/> 
                        : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='chatUserDp me-3' roundedCircle/>
                    ) 
                : null
                }
                <div className='d-flex flex-column'>
                    <p className="messageDisplay px-2 py-1 mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi expedita ipsam dicta qui dolorum cum dignissimos harum iure libero quod molestiae distinctio iste,    itaque obcaecati quisquam ex quos impedit tenetur.
                    </p>
                    <div className='messageBottom'>1hr ago</div>
                </div>
            </div>            
            
        </div>
    </>
}

export default ChatMessage