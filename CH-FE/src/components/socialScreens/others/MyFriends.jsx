import React, { useEffect } from 'react'
import {Card,Row,Col} from 'react-bootstrap'
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
      console.log(res.data.getMyFrds)
      if(res.status === 200){
        toast.success(res.data.message)
        setMyFriends(res.data.getMyFrds)
      }
    } catch (error) {
      // console.log(error.message);
      toast.error(error.response.data.message || error.message)
    }
  }
  useEffect(()=> {
    getMyFriends()
  },[])

  return <>
    <h5>Friends</h5>
        <div>
            <Row md={1} lg={2} className="g-5 m-0">
              {console.log(myFriends,typeof(myFriends))}
                { myFriends.map((e,i) => {
                    return <div key={e._id} className='mt-3'>
                      <Col >
                        <Card style={{ width: '18rem' }} >
                          <Card.Img variant="top" src={e.imageDP} />
                          <Card.Body>
                            <Card.Title>{e.firstName} {e.lastName} {e._id}</Card.Title>
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

export default MyFriends