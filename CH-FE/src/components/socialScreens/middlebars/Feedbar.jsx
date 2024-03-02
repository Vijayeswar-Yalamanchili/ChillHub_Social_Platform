import React, {useState} from 'react'
import {Row, Col,Button,Card,Modal,Form} from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile} from '@fortawesome/free-regular-svg-icons'
import AxiosService from '../../../utils/AxiosService';
import ApiRoutes from '../../../utils/ApiRoutes';

function Feedbar() {
  const [show, setShow] = useState(false);
  const [inputStr, setInputStr] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      const formProps = Object.fromEntries(formData)
      setInputStr('')
      setShow(false)
      console.log(formProps);

      let res = await AxiosService.post(`${ApiRoutes.ADDPOST.path}`,formProps)

      if(res.status === 200){
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }
 
  const feedCards = [
    // "https://www.guvi.in/web-build/images/women1.555f1fd9c475b67115ac2a2d120a84e8.webp",
    // "https://www.guvi.in/web-build/images/award1-capture.ceda9b75a778f99d0890d5821c7039f7.webp",
    // "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885_1280.jpg&tbnid=aVgXecnmQ_f1MM&vet=12ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygBegQIARBN..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&docid=Ba_eiczVaD9-zM&w=1280&h=797&itg=1&q=image&ved=2ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygBegQIARBN",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png%2F1200px-Image_created_with_a_mobile_phone.png&tbnid=peRqpDgIPrDI-M&vet=12ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygAegQIARBL..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&docid=0JWe7yDOKrVFAM&w=1200&h=900&q=image&ved=2ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygAegQIARBL"
  ]

  return <>
    <div className='mt-4 px-4'>
      {/* <div className='openAddFeedBtn'><p >Click here to Put your thoughts!!!</p></div> */}
      <div><input type="text" className='openAddFeedBtn px-3' onClick={handleShow} defaultValue={"Click here to Put your thoughts!!!"} readOnly/></div>
      <div className="feedArea mt-3">
        {
          feedCards.map((e,i)=>{
            return <div key={i}>
              <Col>
                <Card className='mb-5 postFeed mx-auto' style={{ width: '100%' }}>
                  <Card.Img variant="top" src={e}/>
                  <Card.Text className='ms-2'>hkbjkkjnkjkjnknkjnkjnkjnkkjk</Card.Text>
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
        <Modal.Body>
            <Form.Group>
              <Form.Control as='textarea' rows='5' className='feedInputArea' name='text' placeholder='Put your thoughts here ....' 
                      defaultValue={inputStr} onChange={(e)=>setInputStr(e.target.value)}/>
            </Form.Group>
            <div>
              <Button className='smileIcon mx-2' type='button' onClick={() => setShowEmojis(!showEmojis)}>
                <FontAwesomeIcon icon={faFaceSmile} style={{color: "black"}}/>
              </Button>                 
            {
              showEmojis && <EmojiPicker onEmojiClick={(emojiObject)=> {
                setInputStr((prevMsg)=> prevMsg + emojiObject.emoji) 
                setShowEmojis(false); 
                // console.log(emojiObject.emoji)
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