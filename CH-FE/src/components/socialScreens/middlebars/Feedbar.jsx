import React from 'react'
import {Row, Col,Button,Card} from 'react-bootstrap';

function Feedbar() {
  const feedCards = [
    "https://www.guvi.in/web-build/images/women1.555f1fd9c475b67115ac2a2d120a84e8.webp",
    "https://www.guvi.in/web-build/images/award1-capture.ceda9b75a778f99d0890d5821c7039f7.webp",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885_1280.jpg&tbnid=aVgXecnmQ_f1MM&vet=12ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygBegQIARBN..i&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&docid=Ba_eiczVaD9-zM&w=1280&h=797&itg=1&q=image&ved=2ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygBegQIARBN",
    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb6%2FImage_created_with_a_mobile_phone.png%2F1200px-Image_created_with_a_mobile_phone.png&tbnid=peRqpDgIPrDI-M&vet=12ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygAegQIARBL..i&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&docid=0JWe7yDOKrVFAM&w=1200&h=900&q=image&ved=2ahUKEwiLtOTP0fCDAxU6waACHeISAJwQMygAegQIARBL"
  ]
  return <>
    <div className="feedArea mt-3">
      {
        feedCards.map((e,i)=>{
          return <div key={i}>
            <Col>
              <Card className='mb-5 postFeed mx-auto' style={{ width: '95%' }}>
                <Card.Img variant="top" src={e}/>
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
  </>
}

export default Feedbar