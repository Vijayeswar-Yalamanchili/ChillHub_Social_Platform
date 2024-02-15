import React from 'react'
import {Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import Feedbar from './middlebars/Feedbar';


function Home() {
  return <>
    <NavbarAfterLogin/>

    <Container fluid>
      <Row>
        <Col ><Leftbar/></Col>
        <Col xs lg={8}><Feedbar/></Col>
        <Col><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default Home