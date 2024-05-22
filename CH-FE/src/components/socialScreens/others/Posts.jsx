import React,{useState} from 'react'
import {Row, Col,Button,Card,Modal,Form, Image} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile,faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {faPaperPlane, faEdit, faPaperclip} from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import userPic from '../../../assets/svg/userProfilePic.svg'

function Posts({posts, setPosts,post,showEmojis, setShowEmojis}) {

    const [editShow, setEditShow] = useState(false)
    const [editInputStr, setEditInputStr] = useState('')
    const [editSelectedFile, setEditSelectedFile] = useState()
    const [editPreview, setEditPreview] = useState()
    const [commentInput,setCommentInput] = useState('')
    const [comments,setComments] = useState([])
    const [commentsBlock,setCommentsBlock] = useState(false)
    const [currentPostId, setCurrentPostId] = useState()
    
    const handleEditClose = () => {
        setCurrentPostId('')
        setEditShow(false)
    }

    const handleEditShow = (postId) => {
        setEditShow(true)
        setCurrentPostId(postId)
    }
    
    const handleEditSubmit = async(postId) => {
        try {
            const formData = new FormData()
            formData.append('feededData', editInputStr)
            formData.append('imageUrl', editSelectedFile)
            const formProps = Object.fromEntries(formData)
            let token = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(token)
            const id = decodedToken.id
            let res = await AxiosService.post(`${ApiRoutes.UPDATEPOST.path}/${id}/${postId}`,formProps,{
              headers:{
                "Content-Type" : "multipart/form-data",
                "Authorization" : `${token}`
              }
            })
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
                console.log(updatedPosts)
                setEditInputStr(updatedPosts[0].feededData)
                setEditSelectedFile(updatedPosts[0].imageUrl)
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
                if(res.status !== 200){
                    toast.success(error.message)
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
                let res = await AxiosService.put(`${ApiRoutes.POSTREACTION.path}/${postId}`,{ headers : { 'Authorization' : ` ${token}`}})
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleCommentBlock = async(postId) => {
        try {
            setCommentsBlock(!commentsBlock)
            getComments(postId)
            
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    
    const handleComment = async(postId) => {
        try {
            const formData = new FormData()
            formData.append('commentText', commentInput)
            const formProps = Object.fromEntries(formData)
            if(formProps.commentText === ""){
                toast.warning("Please enter some Comment")
            }else{
                let token = localStorage.getItem('loginToken')
                const decodedToken = jwtDecode(token)
                const id = decodedToken.id
                let res = await AxiosService.post(`${ApiRoutes.COMMENTUSERPOST.path}/${id}/${postId}`,formProps,{
                  headers:{
                    "Content-Type" : "application/json",
                    "Authorization" : `${token}`
                  }
                })
                // console.log(res);
                if(res.status === 200){
                    setCommentInput('')
                    getComments(postId)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }
    
    const getComments = async(postId) => { 
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.get(`${ApiRoutes.GETCOMMENTUSERPOST.path}/${id}/${postId}`,{ headers : { 'Authorization' : ` ${getToken}`}})

            if(res.status === 200){
                // toast.success(res.data.message)
                setComments(res.data.postComments.reverse())
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    let getDetailsToken = localStorage.getItem('loginToken')
    const decodeduserDetailsToken = jwtDecode(getDetailsToken)

    return <>
        <div key={post._id}>
            <Col>
                <Card className='mb-5 postFeed mx-auto' style={{ width: '100%'}}>
                    <div className='postHeader p-2 d-flex justify-content-between flex-row align-items-center'>
                        <div className='postUserDatas d-flex justify-content-start align-items-center' style={{width : "100%", gap : "3%"}}>
                            {post.ownerImageDP ===" "|| post.ownerImageDP === undefined ? <Image src={userPic} style={{padding: "5px"}} className='userImage' roundedCircle/> : <Image src={`https://chillhub-social-platform.onrender.com/${post.ownerImageDP}`} className='userImage' roundedCircle/>}
                            <div className='postUserDataName' ><b>{post.ownerName}</b></div>
                        </div>
                        {post.ownerName === decodeduserDetailsToken.name ? 
                            <div className='d-flex justify-content-between flex-row align-items-center'>
                                <Button type='button' variant='none' onClick={() => handleEditPost(post._id)}>
                                    <FontAwesomeIcon icon={faEdit} style={{color: "black"}}/>
                                </Button>
                                <Button type='button' variant='none' onClick={() => handleDeletePost(post._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} style={{color: "black"}}/>
                                </Button>                    
                            </div>                    
                            :
                            null
                        }
                    </div>
                    {/* {post.imageUrl ? <Card.Img variant="top" src={`https://chillhub-social-platform.onrender.com/${post.imageUrl}`} alt='feedPost' className='postImage' style={{maxHeight:"300px"}}/> : null} */}
                    {post.imageUrl ? <Card.Img variant="top" src={`http://localhost:8000/${post.imageUrl}`} alt='feedPost' className='postImage' style={{maxHeight:"300px"}}/> : null}
                    {post.feededData?<Card.Text className='m-2'>{post.feededData}</Card.Text> : null}
                    <Card.Body className='p-0'>
                        <Row>
                            {
                                !post.currentLikeStatus  ? 
                                    <Col style={{paddingRight:"0px"}}><Button variant="light" className='likeBtn' onClick={() => handleLikeBtn(post._id)} style={{ width: '100%' }}>Like</Button></Col> 
                                    : <Col style={{paddingRight:"0px"}}><Button variant="primary" className='likeBtn' onClick={() => handleLikeBtn(post._id)} style={{ width: '100%' }}>Liked</Button></Col>
                            }
                            <Col style={{padding:"0px"}}><Button variant="light" className='commentBtn' style={{ width: '100%' }} onClick={()=>handleCommentBlock(post._id)}>Comment</Button></Col> 
                            <Col style={{paddingLeft:"0px"}}><Button variant="light" className='reportBtn' style={{ width: '100%' }}>Report</Button></Col>
                        </Row>
                      
                      
                        {/* comments */}
                        { !commentsBlock ? null : 
                            <div className='commentSection mt-3'>
                                <div className='px-2'>
                                    <div className='d-flex justify-content-start align-items-center' style={{width : "40%", gap : "3%"}}>
                                        <Image src={decodeduserDetailsToken.imageDP} className='userImage' roundedCircle/>
                                        <div><b>{decodeduserDetailsToken.name}</b></div>
                                    </div>
                                    <Form className='my-2 d-flex justify-content-between' style={{width : "100%"}}>
                                        <div className='commentArea'><input type="text" id='commentArea' name="commentText" placeholder="Enter your Comment"  value={commentInput} onChange={(e)=>setCommentInput(e.target.value)}/></div>
                                        <Button onClick={()=>handleComment(post._id)} style={{backgroundColor : "transparent", border : "none"}}>
                                            <FontAwesomeIcon icon={faPaperPlane} style={{color: "#EB8D8D",width : "1.25rem",height : "1.25rem"}}/>
                                        </Button>
                                    </Form>
                                </div>
                                {/* getcommentsArea */}
                                <div className='px-2 pb-2'>
                                    <Col>
                                        <Card className='commentsFetchArea'>
                                            {
                                                comments && comments.map((e)=> {
                                                    return <ul className="list-group list-group-flush" key={e._id}>
                                                        <li className='list-group-item'>
                                                            <div className='d-flex justify-content-start align-items-center' style={{width : "40%", gap : "3%"}}>
                                                                <Image src={decodeduserDetailsToken.imageDP} className='userImage' roundedCircle/>
                                                                <div><b>{e.ownerName}</b></div>
                                                            </div>
                                                            <div className='p-2'>{e.commentText}</div>
                                                        </li>
                                                    </ul>
                                                })
                                            }    
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                        }  
                    </Card.Body>
                </Card>
            </Col>
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
            !editSelectedFile &&  !editPreview ? null :  <div style={{margin : "1rem 0"}}><img src={editPreview} alt="selected file" style={{width: "100%", height : "15rem"}}/></div>
          }
          <div>
            <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
              <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
            </Button> 
            
            <Button className='attachIcon mx-2' type='button'>
              <label htmlFor='file'><FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/></label>
              <input type="file" name="imageUrl" id="file" onChange={(e) => {
                setEditPreview(URL.createObjectURL(e.target.files[0]))
                setEditSelectedFile((e.target.files[0]))
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

export default Posts