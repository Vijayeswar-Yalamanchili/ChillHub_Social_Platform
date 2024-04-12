import React, { useState, useEffect } from 'react'
import { Form,Button,Modal,Image } from 'react-bootstrap'
import UserTimeline from './UserTimeline'
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { jwtDecode } from "jwt-decode";

function MyProfileBar() {
  const [show, setShow] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [inputBio, setInputBio] = useState('')
  const [dob, setDob] = useState()
  const [bioText, setBioText] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      console.log(e)
      const formData = new FormData(e.target)
      formData.append('imageDP', selectedFile)
      formData.append('dob',dob)
      const formProps = Object.fromEntries(formData)
      console.log(formProps);
      setInputBio('')
      setShow(false)
      let LoginToken = localStorage.getItem('loginToken')
      let res = await AxiosService.post(`${ApiRoutes.ADDUSERBIO.path}`,formProps,{
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : ` ${LoginToken}`        
        }
      })
      if(res.status === 200){
        toast.success(res.data.message)
      }      
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message || error.message)
    }    
  }

  const getUsersData = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETUSERBIO.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
      if(res.status === 200){
        setBioText(res.data.getData)
      }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(() => {
    getUsersData()
  },[])

  return <>
    <div className='mt-4' style={{width:"100%"}}>
      <div className='profileDatas d-flex justify-content-between flex-row align-items' style={{gap: "5%"}}>
        <div className='profilePicImageArea'>
          <Image src={bioText.imageDP} className='imageFile' roundedCircle />          
        </div>
        <div className='bioText'>
          <div>{bioText.bio}</div>
        </div>
      </div>          
      <Button variant="primary" type='submit' className='updateProfileBtn' onClick={handleShow}>Update Profile</Button>
      <hr/>
      <div>
        <h5>My Activity</h5>
        <UserTimeline/>
      </div>
    </div>

    {/* Add post modal */}
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} > 
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight:"13rem"}} className='d-flex justify-content-between flex-column'>
          
          <div className='profilePic d-flex justify-content-around flex-row align-items-center'>
            <div className='profilePicImageArea'>
              <Image src={selectedFile} className='imageFile' roundedCircle />          
            </div>
            <Button type='button' variant='secondary' > 
              <label htmlFor="file">Edit Picture</label>
              <input type="file" name="imageDP" id="file" accept='image/*' onChange={handleChange} style={{display : "none"}}/>
            </Button>
          </div>

          <Form.Group>
            <Form.Control as="textarea" name='bio' rows={8} cols={150} value={inputBio} className='bioInputArea' onChange={(e)=>setInputBio(e.target.value)} placeholder='Put your Bio here ....' required/>         
          </Form.Group>

          <Form.Group className='mt-3'>
            <Form.Label><b>Date Of Birth</b></Form.Label>
            <Form.Control type="date" onChange={(e)=>setDob(e.target.value)}/>         
          </Form.Group>    

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type='submit'>Post</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </>
}

export default MyProfileBar