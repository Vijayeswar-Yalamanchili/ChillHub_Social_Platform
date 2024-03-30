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
          if(res.status === 200){
            // toast.success(res.data.message)
            setPosts(res.data.getuserpost.reverse())
          }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleDeletePost = async(postId) => {
      try {
        if(postId !== ""){
          const updatedPosts = posts.filter((e)=> e._id !== postId)
          setPosts(updatedPosts)
          let token = localStorage.getItem('loginToken')
          let res = await AxiosService.delete(`${ApiRoutes.DELETEUSERPOST.path}/${postId}`,{ headers : { 'Authorization' : `Bearer ${token}`}})
          if(res.status === 200){
            toast.success(res.data.message)
          }
        }
      } catch (error) {
          toast.error(error.response.data.message || error.message)
      }
    }

    const handleLikeBtn = async(postId) => {
      try {
        if(postId !== ""){
          const updatedPosts = posts.map((e)=> { 
            if(e._id == postId){
              e.currentLikeStatus = !e.currentLikeStatus
            }
            return e
          })
          setPosts(updatedPosts)
          let token = localStorage.getItem('loginToken')
          let res = await AxiosService.put(`${ApiRoutes.POSTREACTION.path}/${postId}`,{ headers : { 'Authorization' : `Bearer ${token}`}})
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
                    <div className='postHeader p-2 d-flex justify-content-between flex-row align-items-center'>
                      <div className="fw-bold">{e.ownerName}</div>
                      <Button className='deleteIcon mx-2' type='button' variant='none' onClick={() => handleDeletePost(e._id)}>
                        <FontAwesomeIcon icon={faTrashCan} style={{color: "black"}}/>
                      </Button>
                    </div>
                    <Card.Img variant="top" src={e.imageUrl} alt='feedPost' className='postImage'/>
                    <Card.Text className='m-2'>{e.feededData}</Card.Text>
                    <div className='d-flex flex-row'>
                      <Card.Text className='m-2'>0 Comments</Card.Text>
                    </div>
                    <Card.Body className='p-0'>
                      <Row>
                        {!e.currentLikeStatus  ? 
                            <Col style={{paddingRight:"0px"}}><Button variant="light" className='likeBtn' onClick={() => handleLikeBtn(e._id)} style={{ width: '100%' }}>Like</Button></Col> 
                          : <Col style={{paddingRight:"0px"}}><Button variant="primary" className='likeBtn' onClick={() => handleLikeBtn(e._id)} style={{ width: '100%' }}>Liked</Button></Col>
                        }
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