import React, {useEffect, useState} from 'react'
import {Row, Col,Button,Card,Modal,Form} from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile,faTrashCan} from '@fortawesome/free-regular-svg-icons'
import { faPaperclip} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';
import { jwtDecode } from "jwt-decode";

function Feedbar() {
  const [show, setShow] = useState(false);
  const [inputStr, setInputStr] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [posts, setPosts] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const formProps = Object.fromEntries(formData)
      setInputStr('')
      setShow(false)
      let LoginToken = localStorage.getItem('token')
      let res = await AxiosService.post(`${ApiRoutes.ADDPOST.path}`,formProps,{ headers:{"Authorization" : `Bearer ${LoginToken}`}} )
      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  const getPostData = async() => {
    try {
      let getToken = localStorage.getItem('token')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETPOST.path}/${id}`,{ headers : { 'Authorization' : `Bearer ${getToken}`}})
      // console.log(res);
      if(res.status === 200){
        // toast.success(res.data.message)
        setPosts(res.data.getpost)
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleDeletePost = async() => {
      try {
        let getToken = localStorage.getItem('token')
        const decodedToken = jwtDecode(getToken)
        const id = decodedToken.id
        let res = await AxiosService.delete(`${ApiRoutes.DELETEUSERPOST.path}/${id}`,{ headers : { 'Authorization' : `Bearer ${getToken}`}})
        console.log(res);
        if(res.status === 200){
          toast.success(res.data.message)
        }
      } catch (error) {
          toast.error(error.response.data.message || error.message)
      }
  }

  useEffect(() => {
    getPostData()
  },[])

 
  return <>
    <div className='mt-4 px-4'>
      <div><input type="text" className='openAddFeedBtn px-3' onClick={handleShow} defaultValue={"Click here to Put your thoughts!!!"} readOnly/></div>
      <div className="feedArea mt-3">
        {
          posts.map((e,i)=>{
            return <div key={i}>
              <Col>
                <Card className='mb-5 postFeed mx-auto' style={{ width: '100%'}}>
                  <div>
                    <Button className='deleteIcon mx-2' type='button' variant='none' onClick={() => handleDeletePost()}>
                      <FontAwesomeIcon icon={faTrashCan} style={{color: "black"}}/>
                    </Button>
                  </div>
                  {/* <Card.Img variant="top" src={e}/> */}
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

    {/* Add post modal */}
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}> 
        <Modal.Header closeButton>
          <Modal.Title>Add Feed</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight:"13rem"}} className='d-flex justify-content-between flex-column'>
            <Form.Group>
              <Form.Control as='textarea' rows='5' className='feedInputArea' name='feededData' placeholder='Put your thoughts here ....' 
                      defaultValue={inputStr} onChange={(e)=>setInputStr(e.target.value)}/>
            </Form.Group>
            <div>
              <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
                <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
              </Button> 
              
              <Button className='attachIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
                <FontAwesomeIcon icon={faPaperclip} style={{color: "black"}}/>
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