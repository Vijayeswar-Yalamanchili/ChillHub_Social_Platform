import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import errorScreenAnime from '../../../assets/svg/errorScreenAnime.svg'

function ErrorScreen() {

  const navigate = useNavigate();

  const handleErrorPage = () => {
    let getToken = localStorage.getItem('loginToken')
    if(getToken === null){
      navigate('/')
    }else{
      const decodedToken = jwtDecode(getToken)
      navigate('/home')
    }
  }

  return <>
    <div className='errorBlock d-flex mx-auto mt-5'>
      <img src={errorScreenAnime} alt="errorscreen" className='errorImage' />      
      <Button onClick={()=> handleErrorPage()} className='errorBtn'>Go to Home</Button>
    </div>
  </>
}

export default ErrorScreen