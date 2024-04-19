import React from 'react'
import {Button,Card,Row,Col} from 'react-bootstrap'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';


function SuggestFriends({users,setUsers}) {

    const handleAddFriend = async(friendId) => {
      try {
        if(friendId !== ""){
          const addNewFrdsList = users.filter((e)=> e._id !== friendId)
          let getToken = localStorage.getItem('loginToken')
          const decodedToken = jwtDecode(getToken)
          const id = decodedToken.id
          let res = await AxiosService.put(`${ApiRoutes.ADDFRIEND.path}/${id}/${friendId}`,{ headers : {'Authorization' : ` ${getToken}`}})
          // console.log(res)
          if(res.status === 200){
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
                        <Card style={{ width: '18rem' }} >
                          <Card.Img variant="top" src={e.imageDP} />
                          <Card.Body>
                            <Card.Title>{e.firstName} {e.lastName} {e._id}</Card.Title>
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