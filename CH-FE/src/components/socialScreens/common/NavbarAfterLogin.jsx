import React, {useState, useEffect} from 'react'
import {Nav,Navbar,Button,Container,Form,Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBell, faUser, faMagnifyingGlass, faU, faL} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/png/ChillHub.png'
import {useLogout} from '../../../hooks/UseLogout'

function NavbarAfterLogin() {

    let logout = useLogout()
    let isLoggedIn = true

    // let formik = useFormik()
    let notifications = ["Notification 1","Notification 2","Notification 3","Notification 4","Notification 5"]
    // let myProfileOptions = ["My Profile", "Logout"]

    const [notify,setNotify] = useState(false);
    const [myProfile, setMyProfile] = useState(false)

    const handleNotify = () => setNotify(!notify)
    const handleMyProfile = () => setMyProfile(!myProfile)

    
    let tokenForUsername = localStorage.getItem('token')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

    return <>
        <Navbar expand="lg" className="navbarBg">
            <Container fluid className='containerBlock'>
                <Navbar.Brand href="">
                    <span className='text-white logospan'>
                        <Link to={'/home'} className="logoLink d-flex justify-content-between align-items-center">
                            <img src={logo} alt="Logo" className="logoImg d-inline-block align-top"/>
                            <div className="brandTitle">ChillHub</div>
                        </Link>
                    </span>
                </Navbar.Brand>

                <div className='navbarMenu d-flex justify-content-between'>
                    <Form>
                        <Form.Control type="search" placeholder="Search" id="searchbar" className="me-2" aria-label="Search"/>
                        <Button className='searchIcon'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' style={{color: "white"}}/>
                        </Button>
                    </Form>

                    <div className=' d-flex justify-content-between flex-row align-items-center'>
                        <Link to={'/mytimeline'}>
                        <div style={{color: "white", fontSize : "18px"}}>Hi, {decodedUsernameToken.name}</div></Link>
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navToogle' style={{background:"white"}}/>
                        <Navbar.Collapse id="basic-navbar-nav" className='rightbarNofication'>
                            <Nav className='ms-auto'>
                                <Nav.Link>
                                    <Button className='NavIcon mx-2' onClick={()=>handleNotify()}>
                                        <FontAwesomeIcon icon={faBell} size='xl' style={{color: "#EB8D8D"}}/>
                                    </Button>
                                     <Button className='navText ' onClick={()=>handleNotify()} >
                                        <div className='d-flex justify-content-between'><FontAwesomeIcon icon={faBell} size='xl' style={{color: "white"}}/>Notifications</div>
                                     </Button>
                                </Nav.Link>
                                <Nav.Link>
                                    <Button className='NavIcon mx-2' onClick={()=>handleMyProfile()}>
                                        <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D"}}/>
                                    </Button>
                                    <Button className='navText' onClick={()=>handleMyProfile()} >
                                        <div className='d-flex justify-content-between'><FontAwesomeIcon icon={faUser} size='xl' style={{color: "white"}}/>MyProfile</div>
                                    </Button> 
                                </Nav.Link>          
                            </Nav>          
                        </Navbar.Collapse> 
                    </div>

                    
                </div>       
            </Container>
        </Navbar>

        {/* Add post modal */}
        {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Feed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-4'>
                        <Form.Label>Add Image</Form.Label>
                        <Form.Control type="file"  id='file' name='file' multiple/>
                        {formik.touched.email && formik.errors.email ? (<div style={{color:"red"}}>{formik.errors.email}</div>) : null}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        {formik.touched.email && formik.errors.email ? (<div style={{color:"red"}}>{formik.errors.email}</div>) : null}
                    </Form.Group>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" onClick={handleClose}>Post</Button>
            </Modal.Footer>
        </Modal> */}

        {/* Notification Dropdown */}
        <div>
            {
            notify ? 
                <ul className='notificationsDrpdwn list-group list-group-flush'>
                {
                    notifications.map((e,i)=>{
                        return <div className='list-group-item notifyItem' key={i}>
                            <li >{e}</li>
                            </div>
                    })
                }
                </ul> : null
            }
        </div>

        {/* My Profile Dropdown */}
        <div>
            {
            myProfile ? 
                <div className="myProfileDrpdwn list-group list-group-flush mt-3">
                    <Link to={'/myProfile'} className="list-group-item list-group-item-action">
                        <span className='d-flex align-items-center' style={{gap:"5px"}}>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>My Profile
                        </span>
                    </Link>
                    <Link to={'/'} className="list-group-item list-group-item-action" onClick={logout}>
                        <span className='d-flex align-items-center' style={{gap:"5px"}}>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Logout
                        </span>
                    </Link>
                </div> : null
            }
        </div>
    </>
}

export default NavbarAfterLogin