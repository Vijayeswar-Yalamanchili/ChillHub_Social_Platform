import React from 'react'
import NavbarBeforeLogin from './NavbarBeforeLogin'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import signupAnime from '../../assets/register_anime.svg'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/')
    }

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container>
                <Row>
                    <Col>
                        <img src={signupAnime} alt='signupAnime' className='anime rounded-4'/>
                    </Col>
                    <Col>
                        <Form className='formData p-5 rounded-4'>
                            <Row className="mb-3">
                              <Col>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type='text' placeholder="Enter Firstname" />
                              </Col>
                              <Col>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type='text' placeholder="Enter Lastname" />
                              </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Enter Mobile number" />
                            </Form.Group>
                            <Row className="mb-4">
                              <Col>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder="Enter password" />
                              </Col>
                              <Col>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' placeholder="Enter Confirm Password" />
                              </Col>
                            </Row>
                            <div className="d-grid mb-3">
                                <Button variant='primary' onClick={()=>{handleSubmit()}}>Register</Button>
                            </div>
                            <div className='text-center mb-2'>
                                Already existing user? <Link to={'/'} className='loginTextLink'>Login</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>


  </>
}

export default Register