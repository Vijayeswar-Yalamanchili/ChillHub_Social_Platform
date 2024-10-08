import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import NavbarBeforeLogin from './NavbarBeforeLogin'
import loginAnime from '../../assets/svg/loginAnime.svg'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'

function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleRegister = () => {
        navigate('/register')
    }

    let formik = useFormik({
        initialValues:{
          email:'',
          password:''
        },
        validationSchema:Yup.object({          
          email:Yup.string().required('Email is required').email('Enter a valid email'),
          password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
        }),
        onSubmit : async(values) => {
            try {
                setLoading(true)
                let res = await AxiosService.post(`${ApiRoutes.LOGIN.path}`,values)
                if(res.status === 200){
                    localStorage.setItem('loginToken',res.data.loginToken)
                    navigate('/home')
                }
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.message || error.message)
            }
        }
    })

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container fluid>
                <Row className='rowArea'>
                    <Col md xs={12} className='mb-3'>
                        <img src={loginAnime} alt='loginAnime' className='anime loginAnime rounded-4'/>
                    </Col>
                    <Col md xs={12}>
                        <Form onSubmit={formik.handleSubmit} className='formData loginFormdata p-5 rounded-4'>
                            <Form.Group className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" id='email' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                                {formik.touched.email && formik.errors.email ? (<div style={{color:"red"}}>{formik.errors.email}</div>) : null}
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" id='password' name='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                                {formik.touched.password && formik.errors.password ? (<div style={{color:"red"}}>{formik.errors.password}</div>) : null}
                            </Form.Group>
                            <div className='mb-4'>
                                <Link to={'/forgotpassword'} className='loginTextLink'>Forgot Password</Link>
                            </div>
                            <div className="d-grid mb-4">
                                <Button variant='primary'type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Login'}</Button>
                            </div>
                            <hr style={{color:"black"}}/>
                            <div className="d-grid mb-4">
                                <Button variant='primary' onClick={()=>{handleRegister()}}>Register</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}

export default Login