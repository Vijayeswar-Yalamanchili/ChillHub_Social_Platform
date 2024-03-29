import React, {useEffect, useState} from 'react'
import {Row, Col,Button,Card,Modal,Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan} from '@fortawesome/free-regular-svg-icons'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";

function UserTimeline() {
    const [posts, setPosts] = useState([])

    const getUserPostData = async() => {
        try {
          let getToken = localStorage.getItem('loginToken')
          const decodedToken = jwtDecode(getToken)
          const id = decodedToken.id
          let res = await AxiosService.get(`${ApiRoutes.GETUSERPOST.path}/${id}`,{ headers : { 'Authorization' : `Bearer ${getToken}`}})
          console.log(res);
          if(res.status === 200){
            toast.success(res.data.message)
            setPosts(res.data.getuserpost)
          }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(() => {
      getUserPostData()
    },[])

 
    return <>
        <div className='mt-4 px-4'>
          <div className="feedArea mt-3">
            {
              posts.map((e,i)=>{
                return <div key={i}>
                  <Col>
                    <Card className='mb-5 postFeed mx-auto' style={{ width: '100%'}}>
                      <div className='px-2 d-flex justify-content-between flex-row align-items-center'>
                        <div className="fw-bold">USERNAME</div>
                        <Button className='deleteIcon mx-2' type='button' variant='none' onClick={() => handleDeletePost()}>
                          <FontAwesomeIcon icon={faTrashCan} style={{color: "black"}}/>
                        </Button>
                      </div>
                      <Card.Img variant="top" src={e.image} className='postImage'/>
                      <Card.Text className='ms-2'>{e.feededData}</Card.Text>
                      <div className='d-flex flex-row'>
                        <Card.Text className='ms-2'>0 Likes</Card.Text>
                        <Card.Text className='ms-3'>0 Comments</Card.Text>
                      </div>
                      <Card.Body className='p-0'>
                        <Row>
                          <Col style={{paddingRight:"0px"}}><Button variant="light" className='likeBtn' style={{ width: '100%' }}>Like</Button></Col>
                          <Col style={{padding:"0px"}}><Button variant="light" className='commentBtn' style={{ width: '100%' }}>Comment</Button></Col>
                          <Col style={{paddingLeft:"0px"}}><Button variant="light" className='reportBtn' style={{ width: '100%' }}>Report</Button></Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              })
            }
          </div>
        </div>
    </>
}

export default UserTimeline