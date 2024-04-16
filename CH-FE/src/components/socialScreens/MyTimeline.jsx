import React from 'react'
import {Container,Row, Col} from 'react-bootstrap';
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import UserTimeline from './middlebars/UserTimeline';


function MyTimeline() {
  return <>
    <NavbarAfterLogin/>

    <Container fluid>
      <Row>
        <Col xs={2} sm={2} md={3}><Leftbar/></Col>
        <Col xs={10} sm md={6}><UserTimeline/></Col>
        <Col sm={3} md={3}><Rightbar/></Col>
      </Row>
    </Container>
  </>
}

export default MyTimeline