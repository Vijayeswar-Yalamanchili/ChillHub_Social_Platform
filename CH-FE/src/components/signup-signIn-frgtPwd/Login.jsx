import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import NavbarBeforeLogin from './NavbarBeforeLogin'
import loginAnime from '../../assets/loginAnime.svg'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = () => {
        navigate('/home')
    }

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container>
                <Row>
                    <Col>
                        <img src={loginAnime} alt='loginAnime' className='anime rounded-4'/>
                    </Col>
                    <Col>
                        <Form className='formData p-5 rounded-4'>
                            <Form.Group className="mb-4" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>
                            <div className='mb-4'>
                                <Link to={'/forgotpassword'} className='loginTextLink'>Forgot Password</Link>
                            </div>
                            <div className="d-grid mb-4">
                                <Button variant='primary'onClick={()=>{handleLogin()}}>Login</Button>
                            </div>
                            <hr style={{color:"black"}}/>
                            <div className="d-grid mb-4">
                                <Button variant='primary' onClick={()=>{handleRegister()}}>Register</Button>
                            </div>
                            <div className='text-center mb-4'>
                                <Link to="" className='loginTextLink'>Create a page</Link> for a celebrity, brand or business
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default Login