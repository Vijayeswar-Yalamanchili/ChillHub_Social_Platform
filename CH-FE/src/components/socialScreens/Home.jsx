import React from 'react'
import { Container,Row, Col } from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import Feedbar from './middlebars/Feedbar';


function Home() {
  return <>
    <div style={{position : "fixed", width: "100vw",zIndex:"1"}}><NavbarAfterLogin/></div>

    <Container fluid style={{paddingTop : '5rem'}}>
      <Row>
        <Col xs={2} sm={2} md={3}><Leftbar/></Col>
        <Col xs={10} sm md={6}><Feedbar/></Col>
        <Col sm={3} md={3}><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default Home