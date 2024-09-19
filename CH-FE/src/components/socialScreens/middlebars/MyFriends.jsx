import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import userPic from '../../../assets/svg/userProfilePic.svg'

function MyFriends({myFriends,setMyFriends,users, setUsers}) {
  
  let serverBaseURL = import.meta.env.VITE_SERVER_URL
  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id

  const handleRemoveFriend = async(friendId) => {
    try {
      if(friendId !== ""){
        const updatedFriends = myFriends.filter((e)=> e._id !== friendId)
        setMyFriends(updatedFriends)
        let res = await AxiosService.put(`${ApiRoutes.REMOVEFRIEND.path}/${id}/${friendId}`,{ headers : {'Authorization' : ` ${getLoginToken}`}})     
        let frds = [...users,res.data.removeFriendInFriend]
        if(res.status === 200){
          setUsers(frds)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }   
  }

  return <>
    <h5>Friends</h5>
      <div>
        <Row md={1} lg={1} xl={2} className="g-5 m-0">
          {
            !myFriends.length == "" ? myFriends.map((e,i) => {
              return <div key={e._id} className='mt-3'>
                <Col >
                  <Card style={{ width: '100%' }} >
                    {e.imageDP ===" "|| e.imageDP === undefined ? <Card.Img variant="top" src={userPic} style={{padding: "5px"}}/> : <Card.Img variant="top" src={`${serverBaseURL}/${e.imageDP}`} />}
                    <Card.Body>
                      <Card.Title>{e.firstName} {e.lastName}</Card.Title>
                      <Button variant="danger" onClick={()=>handleRemoveFriend(e._id)}>UnFriend</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </div> }) 
              : 
              <div className='my-3'>
                <Card style={{ width: '100%' }} >
                  <Card.Body>
                    <Card.Text>No Friends</Card.Text>                  
                  </Card.Body>
                </Card>
              </div>
          }
        </Row>
      </div>
  </>
}

export default MyFriends