import React ,{useState, useEffect} from 'react'
import { Button, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function Rightbar() {

  const [onlineFriends, setOnlineFriends] = useState([])

  const getMyOnlineFriends = async() => {
    try {
      let getToken = localStorage.getItem('loginToken')
      const decodedToken = jwtDecode(getToken)
      const id = decodedToken.id
      let res = await AxiosService.get(`${ApiRoutes.GETMYONLINEFRIENDS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})   
      console.log(res.data.myFriendsList)
      let result = res.data.myFriendsList
      let onlineFrds = result.filter((e)=> e.isLoggedIn === true)
      if(res.status === 200){
        setOnlineFriends(onlineFrds)
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(()=> {
    getMyOnlineFriends()
  },[])

  return <>
    <div className="rightBar">
      <div className="friendsList mt-3">
        <h5>Friends Online</h5>
        <ul className="list-group list-group-flush" id="listFriend">
          {
            onlineFriends.length >= 1 ?
              onlineFriends.map((e)=>{
                return <div key={e._id} className="list-group-item list-group-item-action p-0">
                  <Button variant='none'>
                    <li style={{listStyleType:"none",float:"left", gap:"5px"}} className='d-flex align-items-center'>
                      <FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#46F443", width:"8px"}}/>{e.firstName} {e.lastName}
                    </li>
                  </Button>
                </div>
              }) : 
              <div className='my-3'>
                <Card style={{ width: '100%' }} >
                  <Card.Body>
                    <Card.Text>No Online Friends</Card.Text>                  
                  </Card.Body>
                </Card>
              </div>
          }
        </ul>
      </div>
    </div>
  </>
}

export default Rightbar