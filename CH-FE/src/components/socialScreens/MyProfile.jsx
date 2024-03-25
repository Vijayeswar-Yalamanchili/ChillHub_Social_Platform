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
        <Col><Leftbar/></Col>
        <Col xs md={6}><MyProfileBar/></Col>
        <Col><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default MyProfile