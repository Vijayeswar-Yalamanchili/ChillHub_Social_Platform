import React from 'react'
import {Container,Row, Col,Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import NavbarBeforeLogin from './NavbarBeforeLogin';
import resetpwdAnime from '../../assets/resetpwd-anime.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


function ResetPassword() {

    let navigate = useNavigate()
    // const handlePassword = () => {
    //     navigate('/')
    // }

    let updatePasswordFormik = useFormik({
        initialValues:{
            text:'',
            password:''
        },
        validationSchema:Yup.object({          
            text:Yup.string().required('New Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
            password:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password')
        }),
        onSubmit : async(values) => {
            try {
                localStorage.setItem('email',res.data.email)
            } catch (error) {
                toast.error(error.response.data.message || error.message)
            }
        }
    })

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container fluid>
                <div className='rowArea'>
                    <Link to={'/forgotpassword'}><Button variant='secondary' className='mb-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link>    
                    <Row>
                        <Col md xs={12} className='mb-3'>
                            <img src={resetpwdAnime} alt='loginAnime' className='anime forgtpwdAmnime rounded-4'/>
                        </Col>
                        <Col md xs={12}>
                            <Form className='formData p-5 rounded-4' onSubmit={updatePasswordFormik.handleSubmit}>
                                <h3 className='text-white text-center'>Reset Password</h3>
                                <Form.Group className="mb-4" >
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter New Password" id='text' name='text' onChange={updatePasswordFormik.handleChange} value={updatePasswordFormik.values.text} onBlur={updatePasswordFormik.handleBlur}/>
                                    {updatePasswordFormik.touched.text && updatePasswordFormik.errors.text ? (<div style={{color:"red"}}>{updatePasswordFormik.errors.text}</div>) : null}
                                </Form.Group>

                                <Form.Group className="mb-4" >
                                    <Form.Label>Confirm new Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Confirm Password" id='password' name='password' onChange={updatePasswordFormik.handleChange} value={updatePasswordFormik.values.password} onBlur={updatePasswordFormik.handleBlur}/>
                                    {updatePasswordFormik.touched.password && updatePasswordFormik.errors.password ? (<div style={{color:"red"}}>{updatePasswordFormik.errors.password}</div>) : null}
                                </Form.Group>

                                <div className="d-grid mb-4">
                                    <Button variant='primary' type='submit'>Update password</Button>
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