import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import FriendsBar from './middlebars/FriendsBar';

function Friends() {
    return <>
    <NavbarAfterLogin/>

    <Container fluid>
      <Row>
        <Col ><Leftbar/></Col>
        <Col xs lg={6}><FriendsBar/></Col>
        <Col><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default Friends