import React, {useEffect, useState} from 'react'
import {Row, Col,Button,Card,Modal,Form,Image} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile,faTrashCan} from '@fortawesome/free-regular-svg-icons'
import { faEdit,faPaperclip} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";
import userPic from '../../../assets/svg/userProfilePic.svg'

function UserTimeline() {
  const [posts, setPosts] = useState([])
  const [showEmojis, setShowEmojis] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [editPreview, setEditPreview] = useState()
  const [editInputStr, setEditInputStr] = useState()
  const [editSelectedFile, setEditSelectedFile] = useState()
  const [currentPostId, setCurrentPostId] = useState()

  const handleEditClose = () => {
    setCurrentPostId('')
    setEditShow(false)
  }

  const handleEditShow = (postId) => {
    setEditShow(true)
    setCurrentPostId(postId)
  }

  const getUserPostData = async() => {
      try {
        let getToken = localStorage.getItem('loginToken')
        const decodedToken = jwtDecode(getToken)
        const id = decodedToken.id
        let res = await AxiosService.get(`${ApiRoutes.GETUSERPOST.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
        if(res.status === 200){
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
        let res = await AxiosService.delete(`${ApiRoutes.DELETEUSERPOST.path}/${postId}`,{ headers : { 'Authorization' : ` ${token}`}})
        if(res.status === 200){
          toast.success(res.data.message)
        }
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleEditSubmit = async(postId) => {
    try {
      const formData = new FormData()
      formData.append('feededData', editInputStr)
      formData.append('imageUrl', editSelectedFile)
      const formProps = Object.fromEntries(formData)
      console.log(formProps)
      let token = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(token)
      const id = decodedToken.id
      let res = await AxiosService.post(`${ApiRoutes.UPDATEPOST.path}/${id}/${postId}`,formProps,{
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `${token}`
        }
      })
      console.log(res);
      setEditInputStr('')
      setEditSelectedFile('')
      setEditShow(false)
      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleEditPost = async(postId) => {
    try {
      if(postId !== ""){
        handleEditShow(postId)
        const updatedPosts = posts.filter((e)=> e._id == postId)
        setEditInputStr(updatedPosts[0].feededData)
        setEditSelectedFile(updatedPosts[0].imageUrl)
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
        let res = await AxiosService.put(`${ApiRoutes.POSTREACTION.path}/${postId}`,{ headers : { 'Authorization' : ` ${token}`}})
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  let getDetailsToken = localStorage.getItem('loginToken')
  const decodeduserDetailsToken = jwtDecode(getDetailsToken)

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
                    <div className='d-flex justify-content-start align-items-center' style={{width : "40%", gap : "3%"}}>
                      {e.ownerImageDP ===" "|| e.ownerImageDP === undefined ? <Image src={userPic} className='userImage' roundedCircle/> : <Image src={`http://localhost:8000/${e.ownerImageDP}`} className='userImage' roundedCircle/>}
                            {/* <Image src={`http://localhost:8000/${e.ownerImageDP}`} className='userImage' roundedCircle/> */}
                      <div><b>{e.ownerName}</b></div>
                    </div>
                    {e.ownerName === decodeduserDetailsToken.name ? 
                      <div>
                        <Button type='button' variant='none' onClick={() => handleEditPost(e._id)}>
                          <FontAwesomeIcon icon={faEdit} style={{color: "black"}}/>
                        </Button>
                        <Button type='button' variant='none' onClick={() => handleDeletePost(e._id)}>
                          <FontAwesomeIcon icon={faTrashCan} style={{color: "black"}}/>
                        </Button>                    
                      </div>                    
                       :
                      null
                    }
                  </div>
                  <Card.Img variant="top" src={`http://localhost:8000/${e.imageUrl}`} alt='feedPost' className='postImage'/>
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

    {/* Edit post modal */}
    <Modal show={editShow} onHide={handleEditClose}>
      <Form > 
        <Modal.Header closeButton>
          <Modal.Title>Update Feed</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight:"13rem"}} className='d-flex justify-content-between flex-column'>
          <Form.Group>
            <Form.Control as='textarea' rows='5' className='feedInputArea' name='feededData' placeholder='Put your thoughts here ....' 
                    defaultValue={editInputStr} onChange={(e)=>setEditInputStr(e.target.value)}/>              
          </Form.Group>
          {
            !editSelectedFile ? null : ( !editPreview ? null : <div style={{margin : "1rem 0"}}><img src={editPreview} alt="selected file" style={{width: "100%", height : "15rem"}}/></div>)            
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 

            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name="img-file" id="file" onChange={(e) => {
                setEditPreview(URL.createObjectURL(e.target.files[0]))
                setEditSelectedFile(e.target.files[0])
              }} className='attachImgIcon' accept="image/*"/>
            </Button>
          {
            showEmojis && <EmojiPicker onEmojiClick={(emojiObject)=> {
              setEditInputStr((prevMsg)=> prevMsg + emojiObject.emoji) 
              setShowEmojis(false);
            }}/>
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>Cancel</Button>
          <Button variant="primary" onClick={()=>handleEditSubmit(currentPostId)}>Update</Button>
        </Modal.Footer>
        </Form>
    </Modal>
  </>
}

export default UserTimeline