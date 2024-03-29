import React, { useRef, useState, useEffect } from 'react'
import { Form,Button,Modal } from 'react-bootstrap'
import UserTimeline from './UserTimeline'
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import { jwtDecode } from "jwt-decode";

function MyProfileBar() {
  const [show, setShow] = useState(false)
  const uploadedImage = useRef(null)
  const [selectedFile, setSelectedFile] = useState()
  const [inputBio, setInputBio] = useState('')
  const [bioText, setBioText] = useState([])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleChange = (e) => {
    console.log(e.target.files[0])
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  }

  // const handleImageUpload = e => {
  //   const [file] = e.target.files;
  //   if (file) {
  //     const reader = new FileReader();
  //     const {current} = uploadedImage;
  //     // console.log(current.file,uploadedImage);
  //     current.file = file;
  //     reader.onload = (e) => {
  //         current.src = e.target.result;
  //     }
  //     reader.readAsDataURL(file);
  //   }
  // }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault()
      const formData = new FormData(e.target)
      formData.append('imageDP', selectedFile)
      const formProps = Object.fromEntries(formData)
      // console.log(formProps);
      setInputBio('')
      setShow(false)
      let LoginToken = localStorage.getItem('loginToken')
      let res = await AxiosService.post(`${ApiRoutes.ADDUSERBIO.path}`,formProps,{
        headers:{
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${LoginToken}`        
        }
      })      
      // console.log(res);
      if(res.status === 200){
        toast.success(res.data.message)
      }      
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }    
  }

  const getUsersData = async() => {
    try {
      // console.log("hbscjdhfsbc ");
      let getToken = localStorage.getItem('loginToken')
      // console.log(getToken);
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      // console.log(id);
      let res = await AxiosService.get(`${ApiRoutes.GETUSERBIO.path}/${id}`,{ headers : { 'Authorization' : `Bearer ${getToken}`}})
      // console.log(res)
      if(res.status === 200){
        // toast.success(res.data.message)
        setBioText(res.data.getData)
        // console.log(res.data.getData);
      }
    } catch (error) {
        toast.error( error.message)
    }
  }

  useEffect(() => {
    getUsersData()
  },[])

  return <>
    <div className='mt-4' style={{width:"100%"}}>
      <div className='profileDatas d-flex justify-content-between flex-row align-items' style={{gap: "5%"}}>
        <div className='profilePicImageArea'>
          <img src={bioText.imageDP} className='imageFile'/>          
        </div>
        <div className='bioText'>
          <div>{bioText.bio}</div>
        </div>
      </div>          
      <Button variant="primary" type='submit' className='updateProfileBtn' onClick={handleShow}>Update Profile</Button>
      <hr/>
      <div>
        <h5>My Activity</h5>
        {/* <UserTimeline/> */}
        <h5>My Activity</h5>
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
              <img src={selectedFile} className='imageFile'/>          
            </div>
            <Button type='button' variant='secondary' > 
              <label htmlFor="file">Edit Picture</label>
              <input type="file" name="imageDP" id="file" accept='image/*' onChange={handleChange} style={{display : "none"}}/>
            </Button>
          </div>
          <Form.Group>
            <Form.Control as="textarea" name='bio' rows={8} cols={150} value={inputBio} className='bioInputArea' onChange={(e)=>setInputBio(e.target.value)} placeholder='Put your Bio here ....' required/>         
          </Form.Group>
          {/* {
            selectedFile ? <div style={{margin : "1rem 0"}}><img src={selectedFile} alt="selected file" style={{width: "100%", height : "15rem"}}/></div> : null
          } */}
          
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