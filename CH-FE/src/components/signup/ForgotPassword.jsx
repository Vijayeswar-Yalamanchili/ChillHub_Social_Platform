import React from 'react'
import NavbarBeforeLogin from './NavbarBeforeLogin';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import forgotpwdAnime from '../../assets/forgotpwd-anime.svg'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container>
                <Link to={'/'}><Button variant='secondary' className='mb-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link>

                <Row>
                    <Col>
                        <img src={forgotpwdAnime} alt='loginAnime' className='anime rounded-4'/>
                    </Col>
                    <Col>
                        <Form className='formData p-5 rounded-4'>
                            <h3 className='text-white text-center'>Forgot Password</h3>
                            <Form.Group className="mb-4" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter registered email" />
                            </Form.Group>

                            <div className="d-grid mb-4">
                                <Button variant='primary'onClick={()=>{handleSendOtp()}}>Send password</Button>
                            </div>

                            <Form.Group className="mb-4" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>

                            <div className="d-grid mb-4">
                                <Button variant='primary'onClick={()=>{handleValidateOtp()}}>Submit</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default ForgotPassword