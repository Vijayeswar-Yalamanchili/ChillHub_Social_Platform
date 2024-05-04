import React from 'react'
import { Button,Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatMessage from '../others/ChatMessage'
import Conversation from '../others/Conversation'
import { jwtDecode } from "jwt-decode"
import userPic from '../../../assets/svg/userProfilePic.svg'

function MessageBar({user}) {
  console.log(user)

  let own = true
  const isLoggedIn = true
    let tokenForUsername = localStorage.getItem('loginToken')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

  return <>
    <div className='mt-4'>
      <div className="chatWrapper d-flex flex-column justify-content-between">
        <div className="chatHeader">
          {
            isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
              (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                <Image src={userPic} style={{padding: "5px"}} className='chatWrapperDp me-3' roundedCircle/> 
                  : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='chatWrapperDp me-3' roundedCircle/>
              ) 
            : null
          }
          {/* {console.log(currentUser,conversation)} */}
          <div>
              <h5 className='mb-0'>{decodedUsernameToken.name}</h5>
              <div className='mb-0'>{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</div>
          </div>
        </div>
        <div className="chatBody">
          <ChatMessage own={own}/>
          <ChatMessage />
          <ChatMessage own={own}/>
          <ChatMessage />
          <ChatMessage own={own}/>
          <ChatMessage />
          <ChatMessage own={own}/>
          <ChatMessage />
        </div>
        <div className="chatFooter d-flex flex-row justify-content-between p-2">
          <textarea name="chatInputText" className="chatInputText p-2" cols="30" rows="10" placeholder='Type your message here...'></textarea>
          <Button style={{backgroundColor : "transparent", border : "none"}}>
            <FontAwesomeIcon icon={faPaperPlane} style={{color: "#EB8D8D",width : "1.25rem",height : "1.25rem"}}/>
          </Button>
        </div>
      </div>
    </div>
  </>
}

export default MessageBar

{/* <Card style={{ width: '100%',height : "5rem",border : "none" }}>
            <Card.Body className='chatNameCard d-flex flex-row align-items-center px-2' style={{ height : "100%" }}>
              {
                isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                  (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                    <Image src={userPic} style={{padding: "5px"}} className='chatWrapperDp me-3' roundedCircle/> 
                      : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='chatWrapperDp me-3' roundedCircle/>
                  ) 
                : null
              }
              <div>
                <Card.Title>{decodedUsernameToken.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
              </div>
            </Card.Body>
          </Card> */}