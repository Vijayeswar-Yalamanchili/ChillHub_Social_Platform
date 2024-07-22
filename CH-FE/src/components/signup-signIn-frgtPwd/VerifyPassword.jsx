import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';
import ErrorScreen from '../ErrorScreen';
import AxiosService from '../../utils/AxiosService';
import verifyEmailAnime from '../../assets/svg/verifyEmailAnime.svg'

function VerifyPassword() {

  const [validUrl, setValidUrl] = useState(true)
  const [loading, setLoading] = useState(false)
  const params = useParams()

  const verifyEmailUrl = async () => {
    try {
      setLoading(true)
      let res = await AxiosService.get(`/forgotPassword/${params.id}/verify/${params.token}`)
      setValidUrl(true);
      if(res.status === 200){
          toast.success(res.data.message)
      }
      setLoading(false)
    } catch (error) {
      setValidUrl(false)
      toast.error(error.response.data.message || error.message)        
    }
  }

  useEffect(() => {
      verifyEmailUrl()
  }, []);

  return (
    <>
      {validUrl ? (
        <div className='d-flex justify-content-center flex-column align-items-center verifyEmailBg' style={{width: "100vw",height: "100vh", backgroundImage : `url(${verifyEmailAnime})`}}>
          <h1>Click the below button to reset Your password</h1>
          <Link to="/resetpass">
            <Button variant='success' type='button' className='verifyPassBtn p-3' disabled={loading}>{loading ? <Spinner animation="border" /> : 'Reset Password'}</Button>
          </Link>
        </div>
      ) : (
        <ErrorScreen/>
      )}
    </>
  )
}

export default VerifyPassword