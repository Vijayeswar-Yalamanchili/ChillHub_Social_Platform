import React from 'react'
import {Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import MyProfileBar from  './middlebars/MyProfileBar'


function MyProfile() {
  return <>
    <NavbarAfterLogin/>

    <Container fluid>
      <Row>
        <Col xs={2} sm={2} md={3}><Leftbar/></Col>
        <Col xs={10} sm md={6}><MyProfileBar/></Col>
        <Col sm={3} md={3}><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default MyProfile