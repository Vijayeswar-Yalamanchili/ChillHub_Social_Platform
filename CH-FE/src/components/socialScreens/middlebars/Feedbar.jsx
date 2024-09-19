import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react'
import userPic from '../../../assets/svg/userProfilePic.svg'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import Posts from '../others/Posts'

function Feedbar() {

  let serverBaseURL = import.meta.env.VITE_SERVER_URL
  const [user,setUser] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [show, setShow] = useState(false)
  const [inputStr, setInputStr] = useState('')
  const [selectedFile, setSelectedFile] = useState()
  const [showEmojis, setShowEmojis] = useState(false)
  const [preview, setPreview] = useState()
  const [postImage, setPostImage] = useState()
  const [posts, setPosts] = useState([])
  
  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

    
  const getUsers = async() => {
      try {
          let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
          let result = res.data.getusers
          let currentUser = result.filter((user)=> user._id === id)
          if(res.status === 200){
              setUser(currentUser)
          }
      } catch (error) {
          toast.error(error.response.data.message || error.message)
      }
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('feededData', inputStr)
      formData.append('imageUrl', selectedFile)
      const formProps = Object.fromEntries(formData)
      let res = await AxiosService.post(`${ApiRoutes.ADDPOST.path}`,formProps, {
        headers:{
          "Authorization" : `${getLoginToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
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
      let res = await AxiosService.get(`${ApiRoutes.GETPOST.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      const getPostResult = res.data.flatPost
      const images = getPostResult.map((e)=>e.imageUrl)
      if(res.status === 200){
        setPosts(getPostResult.reverse())
        setPostImage(images)
        setCurrentUser(res.data.user)
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  } 

  useEffect(() => {
    getPostData()
    getUsers()
  },[posts])

  return <>
    <div className='feed mt-4 p-3'>
      <div className='d-flex flex-row justify-content-between'>
        {
          user[0]?.imageDP  ? <Image src={`${serverBaseURL}/${user[0].imageDP}`} className='userImage me-3' roundedCircle/>:
          <Image src={userPic} style={{padding: "5px"}} className='userImage p-1 me-3' roundedCircle/>
        }
        <input type="text" className='openAddFeedBtn px-3' onClick={handleShow} defaultValue={"Click here to Put your thoughts!!!"} readOnly/>
      </div>
      <div className="feedArea mt-3">
        {
          posts.map((post)=> (
            <div key={post._id}>
              <Posts post={post} posts={posts} setPosts= {setPosts} showEmojis={showEmojis} setShowEmojis= {setShowEmojis}/>
            </div>
          ))
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
            selectedFile ? (preview ? <div style={{margin : "1rem 0"}}><img src={preview} alt="selected file" style={{width: "100%", height : "15rem"}}/></div> : null) : null
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 
            
            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name='imageUrl' id="file" onChange={(e) => {
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