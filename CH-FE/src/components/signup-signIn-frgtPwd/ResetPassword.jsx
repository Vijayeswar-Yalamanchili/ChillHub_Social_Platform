import React from 'react'
import {Container,Row, Col,Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import resetpwdAnime from '../../assets/resetpwd-anime.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function ResetPassword() {

    let navigate = useNavigate()
    const handlePassword = () => {
        navigate('/')
    }
    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container fluid>
                <div className='rowArea'>
                    <Link to={'/'}><Button variant='secondary' className='mb-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link>    
                    <Row>
                        <Col md xs={12} className='mb-3'>
                            <img src={resetpwdAnime} alt='loginAnime' className='anime forgtpwdAmnime rounded-4'/>
                        </Col>
                        <Col md xs={12}>
                            <Form className='formData p-5 rounded-4' onSubmit={handlePassword}>
                                <h3 className='text-white text-center'>Reset Password</h3>
                                <Form.Group className="mb-4" controlId="formGroupEmail">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter New Password" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formGroupEmail">
                                    <Form.Label>Confirm new Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Confirm Password" />
                                </Form.Group>

                                <div className="d-grid mb-4">
                                    <Button variant='primary' type='submit'>Send password</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>
}

export default ResetPassword