import React from 'react'
import SuggestFriends from '../others/SuggestFriends'
import MyFriends from '../others/MyFriends'

function FriendsBar() {
  return <>
    <div className='p-4'>
      <MyFriends/>
      <hr />
      <SuggestFriends/> 
    </div>
  </>
}

export default FriendsBar