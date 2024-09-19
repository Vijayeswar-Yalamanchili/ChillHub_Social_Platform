import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../assets/png/ChillHub.png'

function NavbarBeforeLogin() {
  return <>
    <Navbar className="navbarBg">
            <Navbar.Brand href="#home">
                <span className='text-white d-flex justify-content-between align-items-center px-3 logospan'>
                    <img src={logo} alt="Logo" className="logoImg d-inline-block align-top"/>
                    <div>ChillHub</div>
                </span>
            </Navbar.Brand>
    </Navbar>
  </>
}

export default NavbarBeforeLogin