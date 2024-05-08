import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    // origin: "https://chill-hub-social-platform.vercel.app"
  }
})

let users = [];
const addUser = (userId,socketId) => {
  !users.some(user => user.userId === userId) && users.push({userId,socketId})
}

const removeUser = (socketId) => {
  users = users.filter((user)=> user.socketId !==socketId)
}

const getUser = (userId) => {
  return users.find((user)=> user.userId === userId)
}

io.on("connection", (socket) => {
  //when Connected
  console.log(`A user connected to port ${PORT} `)
  // io.emit("welcome","hello this is socket text from welcome event")
  //take userId and socketid from user
  socket.on('addUser', userId => {
    addUser(userId,socket.id)
    io.emit('getUsers',users)
  })

  //send & get msg
  socket.on('sendMessgae',({senderId,receiverId,text})=>{
    const user = getUser(receiverId)
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    })
  })

  //when disconnected
  socket.on('disconnect', ()=> {
    console.log("User Disconnected")
    removeUser(socket.id)
    io.emit('getUsers',users)
  })
})

httpServer.listen(PORT,()=>console.log("HttpServer connected from socket"))