import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingComponent() {
  return <>
    <div>
      <p className='loader'><Spinner animation='border'/></p>
    </div>
  </>
}

export default LoadingComponent