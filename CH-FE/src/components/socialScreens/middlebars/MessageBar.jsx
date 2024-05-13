import React, { useState, useEffect, useRef,forwardRef } from 'react'
import { Button,Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatMessage from '../others/ChatMessage'
import { jwtDecode } from "jwt-decode"
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import userPic from '../../../assets/svg/userProfilePic.svg'

const MessageBar = forwardRef(({user,currentChat,messages,setMessages,conversations},socket)=>{

  let getToken = localStorage.getItem('loginToken')
  const [newMessage,setNewMessage] = useState("")
  const scrollRef = useRef()

  const isLoggedIn = true  
  const decodedUsernameToken = jwtDecode(getToken)

  const handleSendMessage = async(e) => {
    e.preventDefault()
    const message = {
      senderId : user[0]._id,
      text : newMessage,
      conversationId : currentChat._id
    }
    const receiverId = currentChat.members.find(member => member !== user[0]._id)    
    socket.current.emit('sendMessgae', {
      senderId : user[0]._id,
      receiverId,
      text : newMessage
    })
    try {
      const res = await AxiosService.post(`${ApiRoutes.ADDNEWMESSAGES.path}`,message)
      setNewMessage('')
      if(res===200){
        setMessages([...messages,res.data.newMessage])
      }
    } catch (error) {
      toast.error(error.res.data.message || error.message)
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
  },[messages])

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
                  messages.map((m,i)=> (
                    <div ref={scrollRef} key={i}>
                      <ChatMessage message={m} own={m.senderId === user[0]?._id} user={user} conversations={conversations}/> 
                    </div>
                  ))
                }
              </div>
              <div className="chatFooter d-flex flex-row justify-content-between p-2">
                <textarea name="chatInputText" className="chatInputText p-2" cols="30" rows="10" placeholder='Type your message here...' onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}></textarea>
                <Button onClick={handleSendMessage} style={{backgroundColor : "transparent", border : "none"}}>
                  <FontAwesomeIcon icon={faPaperPlane} style={{color: "#EB8D8D",width : "1.25rem",height : "1.25rem"}}/>
                </Button>
              </div>
            </div>
          </>
        }
    </div>
  </>
})

export default MessageBar