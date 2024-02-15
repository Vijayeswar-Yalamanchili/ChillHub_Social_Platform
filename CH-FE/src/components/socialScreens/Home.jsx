import React from 'react'
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar';
import Rightbar from './common/Rightbar'
import Feedbar from './middlebars/Feedbar';
import {Container,Row, Col} from 'react-bootstrap';

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