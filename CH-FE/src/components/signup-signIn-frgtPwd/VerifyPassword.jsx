import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import AxiosService from '../../utils/AxiosService';
// import ApiRoutes from '../../utils/ApiRoutes';

function VerifyPassword() {

    const [validUrl, setValidUrl] = useState(true);
    const params = useParams();

    const verifyEmailUrl = async () => {
        try {
            let res = await AxiosService.get(`/forgotPassword/${params.id}/verify/${params.token}`)
            setValidUrl(true);
            if(res.status === 200){
                toast.success(res.data.message)
                // toast.success("url verified")
            }
        } catch (error) {
            console.error(error);
            setValidUrl(false)
            toast.error(error.response.data.message || error.message)
            
        }
    }

    useEffect(() => {
        verifyEmailUrl();
    }, []);

  return (
    <>
      {validUrl ? (
        <div className='d-flex justify-content-center flex-column align-items-center' style={{width: "100vw",height: "100vh"}}>
          <img src="https://raw.githubusercontent.com/cyber-wolve/AuthInMern/Email-Verify-In-MERN/client/src/images/success.png" alt="success_img"/>
          <h1>Click the below button to reset Your password</h1>
          <Link to="/resetpass">
            <Button variant='success' type='button' className='verifyPassBtn p-3'>Reset password</Button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  )
}

export default VerifyPassword