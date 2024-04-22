import React, {useEffect, useState} from 'react'
import {Row, Col,Button,Card,Modal,Form, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile,faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {faPaperPlane, faEdit, faPaperclip} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { jwtDecode } from "jwt-decode"
import Posts from './Posts'

function Feedbar() {
  const [show, setShow] = useState(false)
  const [inputStr, setInputStr] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [showEmojis, setShowEmojis] = useState(false)
  const [preview, setPreview] = useState()
  const [postImage, setPostImage] = useState()
  const [posts, setPosts] = useState([])
  const [comments,setComments] = useState([])
  const isLoggedIn = true

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('feededData', inputStr)
      formData.append('imageUrl', selectedFile)
      const formProps = Object.fromEntries(formData)
      console.log(formProps);
      let token = localStorage.getItem('loginToken')
      let res = await AxiosService.post(`${ApiRoutes.ADDPOST.path}`,formProps, {
        headers:{
          "Authorization" : `${token}`,
          'Content-Type': 'multipart/form-data'
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

  const getPostData = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETPOST.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
      console.log(res.data)
      const getPostResult = res.data.flatPost
      const images = getPostResult.map((e)=>e.imageUrl)
      // console.log(images);
      if(res.status === 200){
        // toast.success(res.data.message)
        setPosts(getPostResult)
        setPostImage(images)
        // if(comments.length>0){
        //   setComments(comments)
        // }
      }
    } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message || error.message)
    }
  }

  let getDetailsToken = localStorage.getItem('loginToken')
  const decodeduserDetailsToken = jwtDecode(getDetailsToken)

  useEffect(() => {
    getPostData()
  },[]) 

  return <>
    <div className='feed mt-4 p-3'>
      <div className='d-flex flex-row justify-content-between'>
        {isLoggedIn? <Image src={decodeduserDetailsToken.imageDP} className='userImage' roundedCircle/> : null}
        <input type="text" className='openAddFeedBtn px-3' onClick={handleShow} defaultValue={"Click here to Put your thoughts!!!"} readOnly/>
      </div>
      <div className="feedArea mt-3">
        {
          posts.map((post)=> (
            <div key={post._id}>
              <Posts post={post} posts={posts} setPosts= {setPosts} comments={comments} setComments= {setComments} showEmojis={showEmojis} setShowEmojis= {setShowEmojis} postImage={postImage} setPostImage={setPostImage}/>
            </div>
          ))
        }
      </div>
      {/* <Posts posts={posts} setPosts= {setPosts} showEmojis={showEmojis} setShowEmojis= {setShowEmojis}/> */}
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
            selectedFile ? (preview ? <div style={{margin : "1rem 0"}}><img src={preview} alt="selected file" style={{width: "100%", height : "15rem"}}/></div> : null) : null
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 
            
            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name='imageUrl' id="file" onChange={(e) => {
                console.log(e.target.files[0]);
                setSelectedFile(e.target.files[0])
                setPreview(URL.createObjectURL(e.target.files[0]))
              }} className='attachImgIcon' accept="image/*"/>
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

  </>
}

export default Feedbar