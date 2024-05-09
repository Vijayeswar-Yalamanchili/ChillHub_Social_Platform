import React, { useState, useEffect, useRef, useContext } from 'react'
import { Container,Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import ChatListBar from './others/ChatListBar'
import MessageBar from './middlebars/MessageBar'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { UserContext } from '../../contextApi/UsersContextComponent'
import {io} from 'socket.io-client'


function Messages() {
  const {user} = useContext(UserContext)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [arrivalMessage,setArrivalMessage] = useState(null)
  const [messages, setMessages] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  let getToken = localStorage.getItem('loginToken')

  const getConversations = async() => {
    try {
        let res = await AxiosService.get(`${ApiRoutes.GETCONVERSATIONS.path}/${user[0]?._id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
        let result = res.data.getConversations
        if(res.status === 200){
            setConversations(result)
        }
    } catch (error) {
        toast.error(error.res.data.message || error.message)
    }
  }

  const getMessages = async() => {
    try {

      let res = await AxiosService.get(`${ApiRoutes.GETMESSAGES.path}/${currentChat?._id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
      if(res.status === 200){
        setMessages(res.data.getmessage)
        
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.res.data.message || error.message)
    }
  }

  // const getChatUserName = async() => {
  //   try {
  //     let res = await AxiosService.get(`${ApiRoutes.GETCHATUSERNAME.path}/${currentChat.members[1]}`)
  //     console.log(res.data)
  //     // if(res === 200){
  //       setFriendData(res.data.getCurrentUser)
  //     // }
  //   } catch (error) {
  //     toast.error(error.res.data.message || error.message)
  //   }
  // }

  useEffect(()=>{
      getConversations()
  },[user])

  useEffect(()=>{
    getMessages()
    // getChatUserName()
  },[currentChat,messages])

  useEffect(()=>{
    socket.current = io("ws://localhost:7000")
    socket.current.on('getMessage',data=> {
      setArrivalMessage({
        senderId : data.senderId,
        text : data.text,
        createdAt : Date.now()
      })
    })
  },[]);

  useEffect(()=>{
    socket.current.emit('addUser', user[0]?._id)
    socket.current.on('getUsers',users=> {
      // console.log(users)
      setOnlineUsers(user[0]?.friends.filter((f)=> users.some(u=>u.userId === f.userId )))
    })
  },[user])
  // console.log(onlineUsers)

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  return <>
    <div style={{position : "fixed", width: "100vw",zIndex:"1"}}>
      <NavbarAfterLogin/>
    </div>
    {/* {console.log(onlineUsers)} */}

    <Container fluid style={{paddingTop : '5rem'}}>
      <Row>
      <Col xs={2} sm={2} md={3}><Leftbar/></Col>
      <Col xs={10} sm md={6}><MessageBar user={user} ref={socket} messages={messages} setMessages={setMessages} currentChat={currentChat}  conversations={conversations}/></Col>
      <Col sm={3} md={3}><ChatListBar user={user} onlineUsers={onlineUsers} conversations={conversations} setConversations={setConversations} currentChat={currentChat} setCurrentChat={setCurrentChat}/></Col>
      </Row>
    </Container>
  </>
}

export default Messages