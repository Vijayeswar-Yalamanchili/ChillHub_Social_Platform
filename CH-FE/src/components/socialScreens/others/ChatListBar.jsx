import React, {useState} from 'react'
import { jwtDecode } from "jwt-decode"
import { Card,Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import userPic from '../../../assets/svg/userProfilePic.svg'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'

function ChatListBar() {

    const [searchChatQuery, setSearchChatQuery] = useState("")
    const [searchChatResults, setSearchChatResults] = useState([])
    const isLoggedIn = true

    let tokenForUsername = localStorage.getItem('loginToken')
    const decodedUsernameToken = jwtDecode(tokenForUsername)

    const handleSearchChange = (searchValue) => {
        setSearchChatQuery(searchValue)
        getSearchChatUser(searchValue)
    }

    const getSearchChatUser = async(searchValue) => {
        try {
            let getToken = localStorage.getItem('loginToken')
            const decodedToken = jwtDecode(getToken)
            const id = decodedToken.id
            let res = await AxiosService.get(`${ApiRoutes.SEARCHCHATUSER.path}/${id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            // console.log(res.data.searchDatas)
            let result = res.data.searchDatas
            let filteredData = result.filter((user)=> {
                return searchValue && user && (user.firstName + user.lastName) && (user.firstName + user.lastName).toLowerCase().includes(searchValue)
            })
            setSearchChatResults(filteredData)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    return <>
        <div className='chatList mt-3'>
            <div className='searchChatField'>                        
            <div className='searchChatBlock'>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "black"}}/>  
                <input placeholder='Search friends to chat ...' className='searchChatBar' value={searchChatQuery} onChange={(e)=>handleSearchChange(e.target.value)}/>
            </div>
            {
                searchChatQuery === ""? null : 
                <div className='searchChatResultsList'>
                {
                    searchChatResults !== "" ?
                     searchChatResults.map((e)=> {
                        return <div className='searchChatResultValue' key={e._id}>{e.firstName} {e.lastName}</div>
                    }) : null
                }
            </div>
            }
            </div>

            <div className='mt-4'>
                <h5>Recent Chats</h5>
                <Card style={{ width: '100%',marginTop : "15px" }}>
                    <ul className=' conversationLists list-group list-group-flush p-1'>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                        <li className="list-group-item">
                            <Card.Body className='userCard d-flex flex-row align-items-center p-0'>
                                {
                                    isLoggedIn === (!decodedUsernameToken.isLoggedIn) ? 
                                        (decodedUsernameToken.imageDP || decodedUsernameToken.imageDP === " " || decodedUsernameToken.imageDP === undefined ? 
                                            <Image src={userPic} style={{padding: "5px"}} className='userImage me-3' roundedCircle/> 
                                                : <Image src={`https://chillhub-social-platform.onrender.com/${decodedUsernameToken.imageDP}`} className='userImage me-3' roundedCircle/>
                                        ) 
                                    : null
                                }
                                <div>
                                    <Card.Title>{decodedUsernameToken.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{!decodedUsernameToken.isLoggedIn ? <div>online</div> : null}</Card.Subtitle>
                                </div>
                            </Card.Body>
                        </li>
                    </ul>                
                </Card>
            </div>
        </div>
    </>
}

export default ChatListBar