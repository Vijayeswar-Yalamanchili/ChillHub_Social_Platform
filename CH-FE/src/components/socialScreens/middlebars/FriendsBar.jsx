import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import SuggestFriends from './SuggestFriends'
import MyFriends from './MyFriends'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function FriendsBar() {

  const [users, setUsers] = useState([])
  const [myFriends, setMyFriends] = useState([])

  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id

  const getUsers = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})   
      let usersResult = res.data.getusers
      let userFrdsResult = res.data.currentUserFrds.map((e)=> e.userId)
      const filteredNewFrds = usersResult.filter((e)=> {
        return !userFrdsResult.includes(e._id)
      })
      let updatedNewFriends = filteredNewFrds.filter((e)=>e._id !== id)        
      if(res.status === 200){
        setUsers(updatedNewFriends)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getMyFriends = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETMYFRIENDS.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      const result  = res.data.myFriendsList
      if(res.status === 200){
        setMyFriends(result)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }
  
  useEffect(()=> {
    getUsers()
    getMyFriends()
  },[])

  return <>
    <div className='p-4'>
      <MyFriends myFriends = {myFriends} setMyFriends ={setMyFriends} users = {users} setUsers ={setUsers}/>
      <hr />
      <SuggestFriends users = {users} setUsers ={setUsers} setMyFriends ={setMyFriends}/> 
    </div>
  </>
}

export default FriendsBar