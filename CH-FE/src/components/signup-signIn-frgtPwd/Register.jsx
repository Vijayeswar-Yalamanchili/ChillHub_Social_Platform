import React from 'react'
import NavbarBeforeLogin from './NavbarBeforeLogin'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import signupAnime from '../../assets/register_anime.svg'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import { toast } from 'react-toastify';

function Register() {

    const navigate = useNavigate();

    const handleRegister = async(e) => {
      try {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)
        // console.log(formProps);

        if(formProps.password === formProps.confirmPassword){
          // console.log("matched");
          let res = await AxiosService.post(`${ApiRoutes.REGISTER.path}`,formProps)
          // console.log(res);
          if(res.status === 200){
            navigate('/') 
          }     
        }else{
          toast.error("Passwords doesnt match! Please enter the same passwords")
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message)
      }
    }

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container fluid>
                <Row className='rowArea'>
                    <Col md xs={12} className='mb-3'>
                        <img src={signupAnime} alt='signupAnime' className='anime rounded-4'/>
                    </Col>
                    <Col md xs={12}>
                        <Form onSubmit={handleRegister} className='formData p-5 rounded-4'>
                            <Row className="mb-3">
                              <Col lg xs={12} className='mb-3'>
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type='text' placeholder="Enter Firstname" name='firstName'/>
                              </Col>
                              <Col lg xs={12}>
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type='text' placeholder="Enter Lastname" name='lastName'/>
                              </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email'/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control type="text" placeholder="Enter Mobile number" name='mobile'/>
                            </Form.Group>
                            <Row className="mb-4">
                              <Col lg xs={12} className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder="Enter password" name='password'/>
                              </Col>
                              <Col lg xs={12}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' placeholder="Enter Confirm Password" name='confirmPassword'/>
                              </Col>
                            </Row>
                            <div className="d-grid mb-3">
                                <Button variant='primary' type="submit">Register</Button>
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