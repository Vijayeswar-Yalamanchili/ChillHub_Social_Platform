import React, {useState, useEffect} from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from '../../../assets/ChillHub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBell, faUser, faU, faL} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'

function NavbarAfterLogin() {

    let notifications = ["Notification 1","Notification 2","Notification 3","Notification 4","Notification 5"]
    // let myProfileOptions = ["My Profile", "Logout"]

    const [show, setShow] = useState(false);
    const [notify,setNotify] = useState(false);
    const [myProfile, setMyProfile] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNotify = () => {
        setNotify(!notify)
    }

    const handleMyProfile = () => {
        setMyProfile(!myProfile)
    }

    // const handleOut = () => {
    //     setMyProfile(myProfile)
    // }

    // useEffect(()=>{
    //     document.addEventListener("mousedown",()=>{
    //         setNotify(false)
    //     })
    //     document.addEventListener("mousedown")
    //     setMyProfile(false)
    // })


    return <>
        <Navbar expand="md" className="navbarBg">
            <Navbar.Brand href="">
                <span className='text-white d-flex justify-content-between align-items-center px-3 logospan'>
                    <img src={logo} alt="Logo" className="logoImg d-inline-block align-top"/>
                    <Link to={'/home'} className="brandTitle"> ChillHub</Link>
                </span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="rightbar justify-content-between me-3">
                <div>
                    <input type="search" name="search" id="searchbar" placeholder='Type here to search...'/>
                </div>
                <div className='d-flex'>
                <Nav.Link>
                    <Button className='NavIcon mx-2' onClick={()=>handleShow()}>
                        <FontAwesomeIcon icon={faPlus} size='xl' style={{color: "#EB8D8D"}}/>
                    </Button>
                </Nav.Link>
                <Nav.Link>
                    <Button className='NavIcon mx-2' onClick={()=>handleNotify()}>
                        <FontAwesomeIcon icon={faBell} size='xl' style={{color: "#EB8D8D"}}/>
                    </Button>
                </Nav.Link>
                <Nav.Link>
                    <Button className='NavIcon mx-2' onClick={()=>handleMyProfile()} onMouseOver={()=>{handleOut()}}>
                        <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D"}}/>
                    </Button>
                </Nav.Link>
                </div>
            </Navbar.Collapse>
        </Navbar>

        {/* Add post modal */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Post Feed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control as="textarea" rows={3} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" onClick={handleClose}>Post</Button>
            </Modal.Footer>
        </Modal>

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
                    <Link to={'/'} className="list-group-item list-group-item-action">
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