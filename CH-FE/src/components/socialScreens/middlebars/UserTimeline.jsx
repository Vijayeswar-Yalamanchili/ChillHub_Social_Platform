import React, { useEffect, useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode"
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import Posts from '../others/Posts'

function UserTimeline() {

  const [posts, setPosts] = useState([])
  const [showEmojis, setShowEmojis] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [editPreview, setEditPreview] = useState()
  const [editInputStr, setEditInputStr] = useState()
  const [editSelectedFile, setEditSelectedFile] = useState()
  const [currentPostId, setCurrentPostId] = useState()

  let getLoginToken = localStorage.getItem('loginToken')
  const decodedToken = jwtDecode(getLoginToken)
  const id = decodedToken.id

  const handleEditClose = () => {
    setCurrentPostId('')
    setEditShow(false)
  }
  
  const handleEditSubmit = async(postId) => {
    try {
      const formData = new FormData()
      formData.append('feededData', editInputStr)
      formData.append('imageUrl', editSelectedFile)
      const formProps = Object.fromEntries(formData)
      let res = await AxiosService.post(`${ApiRoutes.UPDATEPOST.path}/${id}/${postId}`,formProps,{
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `${getLoginToken}`
        }
      })
      setEditInputStr('')
      setEditSelectedFile('')
      setEditShow(false)
      if(res.status !== 200){
        toast.success(error.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getUserPostData = async() => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GETUSERPOST.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
      if(res.status === 200){
        setPosts(res.data.getuserpost.reverse())
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }
  
  useEffect(() => {
    getUserPostData()
  },[posts])

  return <>
    <div className='mt-4 px-4'>
      <div className="feedArea mt-3">
        {
          posts.map((post)=> (
            <div key={post._id}>
              <Posts post={post} posts={posts} setPosts= {setPosts} showEmojis={showEmojis} setShowEmojis= {setShowEmojis} />
            </div>
          ))
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
              <input type="file" name="img-file" id="file" className='attachImgIcon' accept="image/*" onChange={(e) => {
                setEditPreview(URL.createObjectURL(e.target.files[0]))
                setEditSelectedFile(e.target.files[0])
              }}/>
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