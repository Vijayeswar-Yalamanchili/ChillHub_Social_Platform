import React from 'react'
import {Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import Feedbar from './middlebars/Feedbar';


function Home() {
  return <>
    <div style={{position : "fixed", width: "100vw",zIndex:"1"}}><NavbarAfterLogin/></div>

    <Container fluid style={{paddingTop : '5rem'}}>
      <Row>
        <Col><Leftbar/></Col>
        <Col xs md={6}><Feedbar/></Col>
        <Col><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default Home