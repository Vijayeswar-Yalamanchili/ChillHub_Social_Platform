import React, { useState, useEffect } from 'react'
import { Button,Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatMessage from '../others/ChatMessage'
import Conversation from '../others/Conversation'
import { jwtDecode } from "jwt-decode"
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import userPic from '../../../assets/svg/userProfilePic.svg'

function MessageBar({user,currentChat,messages,conversations}) {

  const isLoggedIn = true
  let getToken = localStorage.getItem('loginToken')
  const decodedUsernameToken = jwtDecode(getToken)  

  return <>
    <div className='mt-4'>
        {
          !currentChat ? <div className='noConversationText mx-auto'>Open a conversation to start the chat</div> : <>
            <div className="chatWrapper d-flex flex-column justify-content-between">
              {/* <div className="chatHeader">                
                {
                  isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                    (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                      <Image src={userPic} style={{padding: "5px"}} className='chatWrapperDp me-3' roundedCircle/> 
                        : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='chatWrapperDp me-3' roundedCircle/>
                    ) 
                  : null
                }
                <div>
                  <h5 className='mb-0'>{friendData !== null ? "yes" : "no"} </h5>
                  <div className='mb-0'>{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</div>
                </div>
              </div> */}
              <div className="chatBody">
                {
                  messages.map((m,i)=> <ChatMessage key={i} message={m} own={m.senderId === user[0]?._id} user={user} conversations={conversations}/> )
                }
              </div>
              <div className="chatFooter d-flex flex-row justify-content-between p-2">
                <textarea name="chatInputText" className="chatInputText p-2" cols="30" rows="10" placeholder='Type your message here...'></textarea>
                <Button style={{backgroundColor : "transparent", border : "none"}}>
                  <FontAwesomeIcon icon={faPaperPlane} style={{color: "#EB8D8D",width : "1.25rem",height : "1.25rem"}}/>
                </Button>
              </div>
            </div>
          </>
        }
    </div>
  </>
}

export default MessageBar