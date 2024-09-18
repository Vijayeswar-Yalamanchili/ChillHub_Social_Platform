import React from 'react'
import NavbarAfterLogin from './socialScreens/common/NavbarAfterLogin'
import { Spinner } from 'react-bootstrap'

function LoadingComponent() {
  return <>
    <NavbarAfterLogin/>
    <div>
      <p className='loader'><Spinner animation='border'/></p>
    </div>
  </>
}

export default LoadingComponent