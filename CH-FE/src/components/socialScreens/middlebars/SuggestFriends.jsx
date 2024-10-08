import React from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import userPic from '../../../assets/svg/userProfilePic.svg'

let temp = []

function SuggestFriends({users,setUsers,setMyFriends}) {

  let serverBaseURL = import.meta.env.VITE_SERVER_URL
  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id

  const handleAddFriend = async(friendId) => {
    try {
      if(friendId !== ""){          
        const addNewFrdsList = users.filter((e)=> e._id !== friendId)
        const addNewFrdList = users.filter((e)=> {
          e._id === friendId ? temp.push(e) : null
        })
        let res = await AxiosService.put(`${ApiRoutes.ADDFRIEND.path}/${id}/${friendId}`,{ headers : {'Authorization' : ` ${getLoginToken}`}})
        if(res.status === 200){
          setMyFriends(temp)
          setUsers(addNewFrdsList)
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }      
  }

  return <>
    <h5>Suggest Friends</h5>
    <div>
      <Row md={1} lg={1} xl={2} className="g-5 m-0">
        {
          users.map((e) => {
            return <div key={e._id} className='mt-3'>
              <Col >
                <Card style={{ width: '100%' }} >
                  {e.imageDP ===" "|| e.imageDP === undefined ? <Card.Img variant="top" src={userPic} style={{padding: "5px"}}/> : <Card.Img variant="top" src={`${serverBaseURL}/${e.imageDP}`} />}
                  <Card.Body>
                    <Card.Title>{e.firstName} {e.lastName}</Card.Title>
                    <Button variant="primary" onClick={()=>handleAddFriend(e._id)}>Add Friend</Button>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          })
        }
      </Row>
    </div>
  </>
}

export default SuggestFriends