import React, { useState, useEffect, useRef, useContext } from 'react'
import { Container,Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {io} from 'socket.io-client'
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar'
import ChatListBar from './others/ChatListBar'
import MessageBar from './middlebars/MessageBar'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import ErrorScreen from './common/ErrorScreen'

function Messages() {
  
  const [user,setUser] = useState([])
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [arrivalMessage,setArrivalMessage] = useState(null)
  const [messages, setMessages] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()

  let getToken = localStorage.getItem('loginToken')

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

  useEffect(()=>{
      getConversations()
      getUsers()
  },[conversations])

  useEffect(()=>{
    getMessages()
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

  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  return <>
    {
      getToken !== null ? <>
        <div style={{position : "fixed", width: "100vw",zIndex:"1"}}>
          <NavbarAfterLogin/>
        </div>

        <Container fluid style={{paddingTop : '5rem'}}>
          <Row>
            <Col xs={2} sm={2} md={3}><Leftbar/></Col>

            <Col xs={10} sm md={6}><MessageBar ref={socket} messages={messages} setMessages={setMessages} currentChat={currentChat} conversations={conversations} setConversations={setConversations}/></Col>
            
            <Col sm={3} md={3}><ChatListBar onlineUsers={onlineUsers} conversations={conversations} setCurrentChat={setCurrentChat}/></Col>
          </Row>
        </Container>
      </> : <ErrorScreen/> 
    }    
  </>
}

export default Messages