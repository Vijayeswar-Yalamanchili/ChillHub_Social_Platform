import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import NavbarBeforeLogin from './NavbarBeforeLogin'
import loginAnime from '../../assets/loginAnime.svg'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';
import { toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }

    const handleLogin = async(e) => {
        // navigate('/home')
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const formProps = Object.fromEntries(formData)
            console.log(formProps);
      
            let res = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,formProps)
            // console.log(res);
            if(res.status === 200){
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('role',res.data.firstName)
                sessionStorage.setItem('id',res.data.id)
                navigate('/home')
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container>
                <Row>
                    <Col lg xs={12} className='mb-3'>
                        <img src={loginAnime} alt='loginAnime' className='anime loginAnime rounded-4'/>
                    </Col>
                    <Col lg xs={12}>
                        <Form onSubmit={handleLogin} className='formData p-5 rounded-4'>
                            <Form.Group className="mb-4" controlId="formGroupEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email"  name='email'/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" name='password'/>
                            </Form.Group>
                            <div className='mb-4'>
                                <Link to={'/forgotpassword'} className='loginTextLink'>Forgot Password</Link>
                            </div>
                            <div className="d-grid mb-4">
                                <Button variant='primary'type='submit'>Login</Button>
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