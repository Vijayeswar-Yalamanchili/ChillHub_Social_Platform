import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import NavbarAfterLogin from './common/NavbarAfterLogin'
import Leftbar from './common/Leftbar'
import Rightbar from './common/Rightbar'
import FriendsBar from './middlebars/FriendsBar'
import ErrorScreen from './common/ErrorScreen'

function Friends() {

  const getLoginToken = localStorage.getItem('loginToken')

  return <>
    {
      getLoginToken !== null ? <>
        <NavbarAfterLogin/>
        <Container fluid>
          <Row>
          <Col xs={2} sm={2} md={3}><Leftbar/></Col>
            <Col xs={10} sm={7}  md={6}><FriendsBar/></Col>
            <Col sm={3} md={3}><Rightbar/></Col>
          </Row>
        </Container>
      </> : <ErrorScreen/> 
    }    
  </>
}

export default Friends