import React from 'react'
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import errorScreenAnime from '../assets/svg/errorScreenAnime.svg'

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
    <div className='mx-auto d-flex flex-column justify-content-between align-items-center'>
      <img src={errorScreenAnime} alt="errorscreen" style={{width : "40%",height : "40%"}} />      
      <Button onClick={()=> handleErrorPage()} style={{width : "max-content"}}>Go to Home</Button>
    </div>
  </>
}

export default ErrorScreen