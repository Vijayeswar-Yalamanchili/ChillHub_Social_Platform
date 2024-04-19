import React, { useEffect } from 'react'
import {Card,Row,Col,Button} from 'react-bootstrap'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

function MyFriends({myFriends, setMyFriends}) {

  const getMyFriends = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETMYFRIENDS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
      console.log(res.data);
      if(res.status === 200){
        setMyFriends(res.data.myFriendsList)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleRemoveFriend = async(friendId) => {
    try {
      if(friendId !== ""){
        const updatedFriends = myFriends.filter((e)=> e._id !== friendId)
        setMyFriends(updatedFriends)
        let getToken = localStorage.getItem('loginToken')
        const decodedToken = jwtDecode(getToken)
        const id = decodedToken.id
        let res = await AxiosService.put(`${ApiRoutes.REMOVEFRIEND.path}/${id}/${friendId}`,{ headers : {'Authorization' : ` ${getToken}`}})      
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
      console.log(error.message)
    }   
  }
  
  useEffect(()=> {
    getMyFriends()
  },[])

  return <>
    <h5>Friends</h5>
        <div>
            <Row md={1} lg={1} xl={2} className="g-5 m-0">
                {!myFriends.length == "" ? myFriends.map((e,i) => {
                    return <div key={e._id} className='mt-3'>
                      <Col >
                        <Card style={{ width: '18rem' }} >
                          <Card.Img variant="top" src={e.imageDP} />
                          <Card.Body>
                            <Card.Title>{e.firstName} {e.lastName} {e._id}</Card.Title>
                            <Button variant="danger" onClick={()=>handleRemoveFriend(e._id)}>UnFriend</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  }) : <div className='my-3'>
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