import React, { useState, useEffect, useContext, useRef, forwardRef } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ChatMessage from '../others/ChatMessage'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

const MessageBar = forwardRef(({messages,setMessages,currentChat},socket)=>{

  const [user,setUser] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const scrollRef = useRef()

  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id
    
  const getUsers = async() => {
      try {
          // let getToken = localStorage.getItem('loginToken')
          // const decodedToken = jwtDecode(getToken)
          // const id = decodedToken.id
          let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
          let result = res.data.getusers
          let currentUser = result.filter((user)=> user._id === id)
          if(res.status === 200){
              setUser(currentUser)
          }
      } catch (error) {
          toast.error(error.response.data.message || error.message)
      }
  }

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
      const res = await AxiosService.post(`${ApiRoutes.ADDNEWMESSAGES.path}`,message,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      setNewMessage('')
      if(res===200){
        setMessages([...messages,res.data.newMessage])
      }
    } catch (error) {
      toast.error(error.res.data.message || error.message)
    }
  }

  useEffect(()=>{
    getUsers()
    scrollRef.current?.scrollIntoView({behavior : "smooth"})
  },[messages])

  return <>
    <div className='mt-4'>
        {
          !currentChat ? <div className='noConversationText mx-auto' style={{width:"100%"}}>Open a conversation to start the chat</div> : <>
            <div className="chatWrapper d-flex flex-column justify-content-between">
              <div className="chatBody">
                {
                  messages.map((m,i)=> (
                    <div ref={scrollRef} key={i}>
                      <ChatMessage message={m} own={m.senderId === user[0]?._id}/> 
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