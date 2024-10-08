import React from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import NavbarBeforeLogin from './NavbarBeforeLogin'
import resetpwdAnime from '../../assets/svg/resetpwdAnime.svg'
import AxiosService from '../../utils/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'


function ResetPassword() {

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    let updatePasswordFormik = useFormik({
        initialValues:{
            email : '',
            text:'',
            password:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required('Email is required').email('Enter a valid email'),
            password:Yup.string().required('Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Enter a valid Password'),
            confirmPassword:Yup.string().required('Confirm Password is required').matches(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/,'Confirm Password should match Password')
        }),
        onSubmit : async(values) => {
            try {
                setLoading(true)
                if(values.password === values.confirmPassword){
                    let res = await AxiosService.put(`${ApiRoutes.RESETPASSWORD.path}`,values)
                    if(res.status === 200){
                        toast.success(res.data.message)
                        navigate('/')
                    } 
                    setLoading(false)    
                }else{
                  toast.error("Passwords doesnt match! Please enter the same passwords")
                }
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
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter registered your email" id='email' name='email' onChange={updatePasswordFormik.handleChange} value={updatePasswordFormik.values.email} onBlur={updatePasswordFormik.handleBlur}/>
                                    {updatePasswordFormik.touched.email && updatePasswordFormik.errors.email ? (<div style={{color:"red"}}>{updatePasswordFormik.errors.email}</div>) : null}
                                </Form.Group>

                                <Form.Group className="mb-4" >
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter New Password" id='password' name='password' onChange={updatePasswordFormik.handleChange} value={updatePasswordFormik.values.password} onBlur={updatePasswordFormik.handleBlur}/>
                                    {updatePasswordFormik.touched.password && updatePasswordFormik.errors.password ? (<div style={{color:"red"}}>{updatePasswordFormik.errors.password}</div>) : null}
                                </Form.Group>

                                <Form.Group className="mb-4" >
                                    <Form.Label>Confirm new Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Confirm Password" id='confirmPassword' name='confirmPassword' onChange={updatePasswordFormik.handleChange} value={updatePasswordFormik.values.confirmPassword} onBlur={updatePasswordFormik.handleBlur}/>
                                    {updatePasswordFormik.touched.confirmPassword && updatePasswordFormik.errors.confirmPassword ? (<div style={{color:"red"}}>{updatePasswordFormik.errors.confirmPassword}</div>) : null}
                                </Form.Group>

                                <div className="d-grid mb-4">
                                    <Button variant='primary' type='submit' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Update Password'}</Button>
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