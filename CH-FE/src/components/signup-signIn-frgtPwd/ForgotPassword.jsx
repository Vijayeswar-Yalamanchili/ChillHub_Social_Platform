import React from 'react'
import {Container,Row, Col,Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import forgotpwdAnime from '../../assets/forgotpwd-anime.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../utils/AxiosService';
import ApiRoutes from '../../utils/ApiRoutes';


function ForgotPassword() {

    let navigate = useNavigate()

    const handleCode = async(e) => {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const formProps = Object.fromEntries(formData)
            // console.log(formProps);

            let res = await AxiosService.put(`${ApiRoutes.FORGOTPASSWORD.path}`,formProps)
            if(res.status === 200){
                toast.success(res.data.message)
                // navigate('/')
                toast.success("Random string created")
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleVerifyCode = async(ele) => {
        try{
          ele.preventDefault()
          const formData = new FormData(ele.target)
          const formProps = Object.fromEntries(formData)
          console.log(formProps);
          
          let res = await AxiosService.post(`${ApiRoutes.VERIFYCODE.path}`,formProps)
          console.log(res);
          if(res.status === 200){
            toast.success(res.data.message)
            sessionStorage.setItem('role',res.data.role)
            sessionStorage.setItem('id',res.data.id)
            navigate('/resetpassword')        
          }
         
        } catch (error) {
          // console.log(error);
          toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <NavbarBeforeLogin/>

        <div className='formArea py-5'>
            <Container fluid>
                <div className='rowArea'>
                    <Link to={'/'}><Button variant='secondary' className='mb-3'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back</Button></Link>    
                    <Row>
                        <Col md xs={12} className='mb-3'>
                            <img src={forgotpwdAnime} alt='loginAnime' className='anime forgtpwdAmnime rounded-4'/>
                        </Col>
                        <Col md xs={12} className=''>
                            <div className='formData rounded-4 p-5 d-flex justify-content-between flex-column'>
                                <h3 className='text-white text-center'>Forgot Password</h3>
                                <Form onSubmit={handleCode}>                                
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter registered email" name='email'/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className='col-12'>Send Code</Button>
                                </Form>

                                <Form onSubmit={handleVerifyCode}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Enter code from email</Form.Label>
                                        <Form.Control type="text" placeholder="Enter code" name="randomString"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className='col-12'>Submit</Button>  
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>
}

export default ForgotPassword