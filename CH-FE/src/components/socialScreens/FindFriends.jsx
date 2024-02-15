import React from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import FindFriendsBar from './middlebars/FindFriendsBar';

function FindFriends() {
    return <>
    <NavbarAfterLogin/>

    <Container fluid>
      <Row>
        <Col ><Leftbar/></Col>
        <Col xs lg={8}><FindFriendsBar/></Col>
        <Col><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default FindFriends