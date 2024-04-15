import React, {useState, useEffect} from 'react'
import {Nav,Navbar,Button,Container,Form,Modal} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser, faMagnifyingGlass, faU, faL} from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/png/ChillHub.png'
import {useLogout} from '../../../hooks/UseLogout'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function NavbarAfterLogin() {

    let logout = useLogout()
    let notifications = ["Notification 1","Notification 2","Notification 3","Notification 4","Notification 5"]

    const [notify,setNotify] = useState(false);
    const [myProfile, setMyProfile] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleNotify = () => setNotify(!notify)
    const handleMyProfile = () => setMyProfile(!myProfile)
    
    let tokenForUsername = localStorage.getItem('loginToken')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

    const handleLogout = async() => {
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.put(`${ApiRoutes.LOGOUT.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            if(res.status === 200){
              logout()
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleSearchChange = (searchValue) => {
        // console.log(searchValue)
        setSearchQuery(searchValue)
        getSearchData(searchValue)
    }

    const getSearchData = async(searchValue) => {
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            console.log(id,searchValue);
            let res = await AxiosService.get(`${ApiRoutes.SEARCHDATA.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            // console.log(res.data.searchDatas)
            let result = res.data.searchDatas
            // console.log(result.firstName);
            let filteredData = result.filter((user)=> {
                return searchValue && user && (user.firstName + user.lastName) && (user.firstName + user.lastName).toLowerCase().includes(searchValue)
            })
            // console.log(filteredData)
            setSearchResults(filteredData)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <Navbar expand="lg" className="navbarBg">
            <Container fluid className='containerBlock'>
                <Navbar.Brand href="">
                    <span className='text-white logospan'>
                        <Link to={'/home'} className="logoLink d-flex justify-content-between align-items-center">
                            <img src={logo} alt="Logo" className="logoImg d-inline-block align-top"/>
                            <div className="brandTitle">ChillHub</div>
                        </Link>
                    </span>
                </Navbar.Brand>

                <div className='searchField'>                        
                    <div className='searchBlock'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "black"}}/>  
                        <input placeholder='Search friends here ...' className='searchBar' value={searchQuery} onChange={(e)=>handleSearchChange(e.target.value)}/>
                    </div>
                    {
                        searchQuery === ""? null : 
                        <div className='searchResultsList'>
                        {
                            searchResults !== "" ?
                             searchResults.map((e)=> {
                                return <div className='searchResultValue'>{e.firstName} {e.lastName}</div>
                            }) : null
                        }
                    </div>
                    }
                </div>
                
                <div className='navbarMenu d-flex justify-content-between'>
                    <div className='d-flex justify-content-between flex-row align-items-center'>
                        <div className='userName' style={{color: "white", fontSize : "18px"}}>Hi, {decodedUsernameToken.name}</div>
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navToogle' style={{background:"white"}}/>
                        <Navbar.Collapse id="basic-navbar-nav" className='rightbarNofication'>
                            <Nav className='ms-auto'>
                                <Nav.Link>
                                    <Button className='NavIcon mx-2' onClick={()=>handleNotify()}>
                                        <FontAwesomeIcon icon={faBell} size='xl' style={{color: "#EB8D8D"}}/>
                                    </Button>
                                     <Button className='navText ' onClick={()=>handleNotify()} >
                                        <div className='d-flex justify-content-between'><FontAwesomeIcon icon={faBell} size='xl' style={{color: "white"}}/>Notifications</div>
                                     </Button>
                                </Nav.Link>
                                <Nav.Link>
                                    <Button className='NavIcon mx-2' onClick={()=>handleMyProfile()}>
                                        <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D"}}/>
                                    </Button>
                                    <Button className='navText' onClick={()=>handleMyProfile()} >
                                        <div className='d-flex justify-content-between'><FontAwesomeIcon icon={faUser} size='xl' style={{color: "white"}}/>MyProfile</div>
                                    </Button> 
                                </Nav.Link>          
                            </Nav>          
                        </Navbar.Collapse> 
                    </div>                    
                </div>       
            </Container>
        </Navbar>    

        {/* Notification Dropdown */}
        <div>
            {
            notify ? 
                <ul className='notificationsDrpdwn list-group list-group-flush'>
                {
                    notifications.map((e,i)=>{
                        return <div className='list-group-item notifyItem' key={i}>
                            <li >{e}</li>
                            </div>
                    })
                }
                </ul> : null
            }
        </div>

        {/* My Profile Dropdown */}
        <div>
            {
            myProfile ? 
                <div className="myProfileDrpdwn list-group list-group-flush mt-3">
                    <Link to={'/myProfile'} className="list-group-item list-group-item-action">
                        <span className='d-flex align-items-center' style={{gap:"5px"}}>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>My Profile
                        </span>
                    </Link>
                    <Link  className="list-group-item list-group-item-action" onClick={handleLogout}>
                        <span className='d-flex align-items-center' style={{gap:"5px"}}>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Logout
                        </span>
                    </Link>
                </div> : null
            }
        </div>
    </>
}

export default NavbarAfterLogin