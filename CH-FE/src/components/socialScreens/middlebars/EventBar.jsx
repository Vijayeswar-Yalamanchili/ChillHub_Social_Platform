import React,{ useEffect,useState } from 'react'
import {Button,Card,Row,Col} from 'react-bootstrap'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

function EventBar() {
  const [users, setUsers] = useState([])

  const getUsers = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})   
      let result = res.data.getusers
      // console.log(result);
      let updatedNewFriends = result.filter((e)=>e._id !== id)
      // console.log(updatedNewFriends)
      const todayBday = updatedNewFriends.filter((e) => {

        const d1 = new Date(e.dob)
        const d2 = new Date() 
        console.log("userDob :" + d1)
        console.log("TodayDate :" + d2)
        // console.log(e.dob)
        if(d1 === d2){
          // return d1
          console.log("same")
        }else{
          console.log("diff");
        }
      })
      // console.log(todayBday)
      if(res.status === 200){
        toast.success(res.data.message)
        setUsers(todayBday)
        // console.log(res.data.getusers)
      }
    } catch (error) {
      console.log(error.message);
        // toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getUsers()
  },[])

  return <>
    <h5>Today</h5>
    <div>
        <Row xs={1} md={2} className="g-5 m-0">
            {
              users.map((e,i) => {
                return <div key={e._id} className='mt-3'>
                  <Col >
                    <Card style={{ width: '18rem' }} >
                      <Card.Img variant="top" src={e.imageDP} />
                      <Card.Body>
                        <Card.Title>{e.firstName} {e.lastName}</Card.Title>
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

export default EventBar