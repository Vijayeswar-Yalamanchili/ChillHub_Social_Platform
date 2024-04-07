import React, { useEffect,useState } from 'react'
import {Button,Card,Row,Col} from 'react-bootstrap'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

function SuggestFriends({users,setUsers}) {
  
    const [friends, setFriends] = useState([])

    const getUsers = async() => {
      try {
        let getToken = localStorage.getItem('loginToken')
        const decodedToken = jwtDecode(getToken)
        const id = decodedToken.id
        let res = await AxiosService.get(`${ApiRoutes.GETUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})   
        // console.log(res)
        let result = res.data.getusers
        let updatedNewFriends = result.filter((e)=>e._id !== id)
        if(res.status === 200){
          // toast.success(res.data.message)
          setUsers(updatedNewFriends)
        }
      } catch (error) {
        console.log(error.message);
          // toast.error(error.response.data.message || error.message)
      }
    }

    const handleAddFriend = async(friendId) => {
      try {
        if(friendId !== ""){
          console.log(friendId)
          const frdsList = friends.filter((e)=> e.id !== friendId)
          console.log(frdsList);
          const addNewFrdsList = users.filter((e)=> e._id !== friendId)
          console.log(addNewFrdsList);
          setUsers(addNewFrdsList)
          setFriends(frdsList)
          let getToken = localStorage.getItem('loginToken')
          const decodedToken = jwtDecode(getToken)
          const id = decodedToken.id
          let res = await AxiosService.put(`${ApiRoutes.ADDFRIEND.path}/${id}/${friendId}`,{ headers : {'Authorization' : ` ${getToken}`}})
          // console.log(res)
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message)
        // console.log(error.message)
      }      
    }

    useEffect(()=> {
      getUsers()
    },[])

    return <>
        <h5>Suggest Friends</h5>
        <div>
            <Row md={1} lg={2} className="g-5 m-0">
                {
                  users.map((e,i) => {
                    return <div key={e._id} className='mt-3'>
                      <Col >
                        <Card style={{ width: '18rem' }} >
                          <Card.Img variant="top" src={e.imageDP} />
                          <Card.Body>
                            <Card.Title>{e.firstName} {e.lastName} {e._id}</Card.Title>
                            <Button variant="primary" onClick={()=>handleAddFriend(e._id)}>Add Friend</Button>
                            {/* <Button variant="primary">Go somewhere</Button> */}
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