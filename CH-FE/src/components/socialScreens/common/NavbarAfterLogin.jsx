import React, { useState, useEffect } from 'react'
import { Nav, Navbar, Button, Container, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '../../../hooks/UseLogout'
import logo from '../../../assets/png/ChillHub.png'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function NavbarAfterLogin() {

    let logout = useLogout()
    const [user,setUser] = useState([])
    const [notify,setNotify] = useState(false);
    const [myProfile, setMyProfile] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleNotify = () => setNotify(!notify)
    const handleMyProfile = () => setMyProfile(!myProfile)
    
    // let tokenForUsername = localStorage.getItem('loginToken')
    // const decodedUsernameToken = jwtDecode(tokenForUsername)

    
    const getUsers = async() => {
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            let result = res.data.getusers
            let currentUser = result.filter((user)=> user._id === id)
            if(res.status === 200){
                setUser(currentUser)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

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
            let result = res.data.searchDatas
            let filteredData = result.filter((user)=> {
                return searchValue && user && (user.firstName + user.lastName) && (user.firstName + user.lastName).toLowerCase().includes(searchValue)
            })
            setSearchResults(filteredData)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }
    
    useEffect(()=>{
        getUsers()
    },[])

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
                        {/* <div className='userName' style={{color: "white", fontSize : "18px"}}>Hi, {decodedUsernameToken.name}</div> */}
                        <div className='userName' style={{color: "white", fontSize : "18px"}}>Hi</div>
                        <Nav className='ms-auto'>
                            <Nav.Link>
                                <Button className='NavIcon mx-2' onClick={()=>handleMyProfile()}>
                                    <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D"}}/>
                                </Button>
                            </Nav.Link>
                        </Nav>                        
                    </div>                    
                </div>

            </Container>
        </Navbar>

        {/* My Profile Dropdown */}
        <div>
            {
            myProfile ? 
                <div className="myProfileDrpdwn list-group list-group-flush mt-3">
                    <div className='listMenuUserName list-group-item list-group-item-action'>
                        <Image className="userImage my-2" src={`https://chillhub-social-platform.onrender.com/${user[0].imageDP}`} roundedCircle/>
                        <div><b>Welcome</b></div>
                        {/* <div><b>Welcome, {decodedUsernameToken.name}</b></div> */}
                    </div>
                    <Link to={'/myProfile'} className="listMenu list-group-item list-group-item-action">
                        <span className='d-flex align-items-center' style={{gap:"15px"}}>
                            <FontAwesomeIcon icon={faUser} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>My Profile
                        </span>
                    </Link>
                    <Link  className="listMenu list-group-item list-group-item-action" onClick={handleLogout}>
                        <span className='d-flex align-items-center' style={{gap:"15px"}}>
                            <FontAwesomeIcon icon={faRightToBracket} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Logout
                        </span>
                    </Link>
                </div> : null
            }
        </div>
    </>
}

export default NavbarAfterLogin