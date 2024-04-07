import React, {useEffect, useState} from 'react'
import {Row, Col,Button,Card,Modal,Form} from 'react-bootstrap'
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile,faTrashCan} from '@fortawesome/free-regular-svg-icons'
import { faEdit, faPaperclip} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import dummyFeedImg from '../../../assets/jpg/dummyFeedImg.jpg'
import { jwtDecode } from "jwt-decode"

function Feedbar() {
  const [show, setShow] = useState(false)
  const [inputStr, setInputStr] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)
  const [posts, setPosts] = useState([])
  const [selectedFile, setSelectedFile] = useState()
  const [currentPostId, setCurrentPostId] = useState()

  const [editShow, setEditShow] = useState(false)
  const [editInputStr, setEditInputStr] = useState()
  const [editSelectedFile, setEditSelectedFile] = useState()


  const isLoggedIn = true

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleEditClose = () => {
    setCurrentPostId('')
    setEditShow(false)    
  }

  const handleEditShow = (postId) => {
    setEditShow(true)
    setCurrentPostId(postId)
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('feededData', inputStr)
      formData.append('imageUrl', selectedFile)
      const formProps = Object.fromEntries(formData)
      console.log(formProps,selectedFile);
      let token = localStorage.getItem('loginToken')
      let res = await AxiosService.post(`${ApiRoutes.ADDPOST.path}`,formProps, {
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `${token}`        
        }
      })
      console.log(res)
      setInputStr('') 
      setSelectedFile('')
      setShow(false)
      const updatedPosts = [...posts,res.data.postData]
      setPosts(updatedPosts)
      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleEditSubmit = async(postId) => {
    try {
      console.log(postId)
      const formData = new FormData()
      formData.append('feededData', editInputStr)
      formData.append('imageUrl', editSelectedFile)
      const formProps = Object.fromEntries(formData)
      // console.log(formProps,editSelectedFile);
      let token = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(token)
      const id = decodedToken.id      
      console.log("userId: "+id, " &","postId: "+postId, formProps) 
      let res = await AxiosService.post(`${ApiRoutes.UPDATEPOST.path}/${id}/${postId}`,formProps,{
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `${token}`        
        }
      })
      console.log(res)
      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
        console.log(error.message)
        // toast.error(error.response.data.message || error.message)
    }
  }

  const handleEditPost = async(postId) => {
    try {
      console.log("clicked edit btn");
      if(postId !== ""){
        // console.log(postId)
        handleEditShow(postId)
        const updatedPosts = posts.filter((e)=> e._id == postId)
        setEditInputStr(updatedPosts[0].feededData)
        setEditSelectedFile(updatedPosts[0].imageUrl)
      }
    } catch (error) {
      // toast.error(error.response.data.message || error.message)
      console.log(error.message);
    }
  }

  const handleDeletePost = async(postId) => {
    try {
      if(postId !== ""){
        const updatedPosts = posts.filter((e)=> e._id !== postId)
        console.log(updatedPosts);
        setPosts(updatedPosts)
        console.log(updatedPosts);
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

  const getPostData = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETPOST.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
      // console.log(res);
      if(res.status === 200){
        // toast.success(res.data.message)
        setPosts(res.data.getpost.reverse())
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
  // console.log(decodeduserDetailsToken);

  useEffect(() => {
    getPostData()
  },[]) 

  return <>
    <div className='mt-4 px-4'>
      <div className='d-flex flex-row justify-content-between'>
        {isLoggedIn? <img src={decodeduserDetailsToken.imageDP} className='userImage'/>: null}
        <input type="text" className='openAddFeedBtn px-3' onClick={handleShow} defaultValue={"Click here to Put your thoughts!!!"} readOnly/>
      </div>
      <div className="feedArea mt-3">
        {
          posts.map((e,i)=>{
            return <div key={e._id}>
              <Col>
                <Card className='mb-5 postFeed mx-auto' style={{ width: '100%'}}>
                  <div className='postHeader py-2 px-3 d-flex justify-content-between flex-row align-items-center'>
                    <div className="fw-bold">{e.ownerName}</div>
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
                  <Card.Img variant="top" src={e.imageUrl} alt='feedPost' className='postImage'/>
                  {/* <Card.Img variant="top" src={e.imageUrl ||  ? `http://localhost:8000/postImages/${e.imageUrl}` : dummyFeedImg} alt='feedPost' className='postImage'/> */}
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

    {/* Add post modal */}
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} > 
        <Modal.Header closeButton>
          <Modal.Title>Add Feed</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight:"13rem"}} className='d-flex justify-content-between flex-column'>
          <Form.Group>
            <Form.Control as='textarea' rows='5' className='feedInputArea' name='feededData' placeholder='Put your thoughts here ....' 
                    defaultValue={inputStr} onChange={(e)=>setInputStr(e.target.value)}/>              
          </Form.Group>
          {
            selectedFile ? <div style={{margin : "1rem 0"}}><img src={selectedFile} alt="selected file" style={{width: "100%", height : "15rem"}}/></div> : null
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 
            
            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name="img-file" id="file" onChange={(e) => setSelectedFile(URL.createObjectURL(e.target.files[0]))} className='attachImgIcon' accept="image/*"/>
            </Button>
          {
            showEmojis && <EmojiPicker onEmojiClick={(emojiObject)=> {
              setInputStr((prevMsg)=> prevMsg + emojiObject.emoji) 
              setShowEmojis(false);
            }}/>
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type='submit'>Post</Button>
        </Modal.Footer>
        </Form>
    </Modal>

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
            !editSelectedFile ? null :
            <div style={{margin : "1rem 0"}}><img src={editSelectedFile} alt="selected file" style={{width: "100%", height : "15rem"}}/></div>
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 
            
            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name="img-file" id="file" onChange={(e) => setEditSelectedFile(URL.createObjectURL(e.target.files[0]))} className='attachImgIcon' accept="image/*"/>
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

export default Feedbar