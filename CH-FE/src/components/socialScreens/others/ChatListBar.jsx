import React, {useState, useEffect} from 'react'
import { Card,Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircle, faUsersRays, faComment, faCommentMedical} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import Conversation from './Conversation'
import RightBar from '../common/Rightbar'

function ChatListBar({onlineUsers,conversations, setCurrentChat}) {

    const [searchChatQuery, setSearchChatQuery] = useState("")
    const [conversation, setConversation] = useState("")
    const [searchChatResults, setSearchChatResults] = useState([])
    const [onlinebarOpen, setOnlinebarOpen] = useState(false)
    const [convobarOpen, setConvobarOpen] = useState(false)
    const [onlineFriends, setOnlineFriends] = useState([])
    const [user,setUser] = useState([])

    let getLoginToken = localStorage.getItem('loginToken')
    const decodedToken = jwtDecode(getLoginToken)
    const id = decodedToken.id
    
    const getUsers = async() => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.GETALLUSERS.path}/${id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
            let result = res.data.getusers
            let currentUser = result.filter((user)=> user._id === id)
            if(res.status === 200){
                setUser(currentUser)
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleSearchChange = (searchValue) => {
        setSearchChatQuery(searchValue)
        getSearchChatUser(searchValue)
    }

    const getSearchChatUser = async(searchValue) => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.SEARCHCHATUSER.path}/${user[0]._id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
            let result = res.data.searchDatas
            let usersList = result.filter((e)=> e._id !== user[0]?._id)
            let filteredData = usersList.filter((user)=> {
                return searchValue && user && (user.firstName + user.lastName) && (user.firstName + user.lastName).toLowerCase().includes(searchValue)
            })
            setSearchChatResults(filteredData)
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleAddConversation = async(friendId) => {
        try {
            let checkConvo = await AxiosService.get(`${ApiRoutes.GETCONVERSATIONS.path}/${user[0]?._id}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})
            let checkConvoResult = checkConvo.data.getConversations
            let isConvoExist = checkConvoResult.filter((e)=> e.members[1] === friendId)
            setSearchChatQuery("")
            if(!isConvoExist[0]){
                let convoBody = {
                    members : [user[0]?._id,friendId],
                    conversationStatus:true
                }
                const addConvo = await AxiosService.post(`${ApiRoutes.ADDNEWCONVERSATIONS.path}`,convoBody)
                const result = addConvo.data.addConv
                if(addConvo===200){ 
                    setConversation(result)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const getMyOnlineFriends = async() => {
        let userId = user[0]?._id
        try {
            if(userId){
                let res = await AxiosService.get(`${ApiRoutes.GETMYONLINEFRIENDS.path}/${userId}`,{ headers : { 'Authorization' : ` ${getLoginToken}`}})   
                let result = res.data.myFriendsList
                let onlineFrds = result.filter((e)=> e.isLoggedIn === true)
                if(res.status === 200){
                    setOnlineFriends(onlineFrds)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleOnlineListbar = () => {
        setOnlinebarOpen(!onlinebarOpen)    
    }

    const handleConvoListbar = () => {
        setConvobarOpen(!convobarOpen)    
    }

    useEffect(()=> {
        getUsers()
        getMyOnlineFriends()        
    },[]) 

    return <>
        <div className='messagesRightbar'>
            <div className='chatList mt-3'>
                <div className='searchChatField'>                        
                    <div className='searchChatBlock'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "black"}}/>  
                        <input placeholder='Search friends to create chats...' className='searchChatBar' value={searchChatQuery} onChange={(e)=>handleSearchChange(e.target.value)}/>
                    </div>
                    {
                        searchChatQuery === ""? null : 
                        <div className='searchChatResultsList'>
                            {
                                searchChatResults !== "" ?
                                searchChatResults.map((e)=> {
                                    return <div className='searchChatResultValue' key={e._id} onClick={()=>handleAddConversation(e._id)}>{e.firstName} {e.lastName}</div>
                                }) : null
                            }
                        </div>
                    }
                </div>
                
                <div className='mt-3'>
                    <h5>Chats</h5>
                    <Card style={{ width: '100%',marginTop : "15px" }}>
                        <ul className=' conversationLists list-group list-group-flush p-1'>
                            {
                                conversations.length > 0?
                                    conversations.map((c)=> 
                                        <li className="userCardList list-group-item px-1 py-2" key={c._id}>
                                            <Card.Body className='userCard d-flex flex-row align-items-center p-0' onClick={()=>setCurrentChat(c)}>
                                                <Conversation conversation={c} currentUserId={user[0]?._id}/>
                                            </Card.Body>
                                        </li>
                                    ) : 
                                    <div >
                                        <Card style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Text>No Convos</Card.Text>                  
                                            </Card.Body>
                                        </Card>
                                    </div>
                            }
                        </ul>                
                    </Card>
                </div>
                <hr/>
                <RightBar onlineUsers={onlineUsers} setCurrentChat={setCurrentChat}/>
            </div>
        </div>

        <div className='messagesRightbarSlide'>
            <div className='onlineBtn' onClick={handleOnlineListbar}><FontAwesomeIcon className='onlineIcon' icon={faUsersRays}/></div>
            <div className='convoBtn' onClick={handleConvoListbar}><FontAwesomeIcon className='convoIcon' icon={faCommentMedical}/></div>

        {!convobarOpen ? null :
            <div className='chatListSidebar mt-3'>
                <div className='searchChatField'>                        
                    <div className='searchChatBlockSide'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "white"}}/>  
                        <input placeholder='Search friends to create chats...' className='searchChatBarside' value={searchChatQuery} onChange={(e)=>handleSearchChange(e.target.value)}/>
                    </div>
                    {
                        searchChatQuery === ""? null : 
                        <div className='searchChatResultsListSide'>
                            {
                                searchChatResults !== "" ?
                                searchChatResults.map((e)=> {
                                    return <div className='searchChatResultValue' key={e._id} onClick={()=>handleAddConversation(e._id)}>{e.firstName} {e.lastName}</div>
                                }) : null
                            }
                        </div>
                    }
                </div>
                
                <div className='mt-3'>
                    <h5>Chats</h5>
                    <Card style={{ width: '100%',marginTop : "15px" }}>
                        <ul className=' conversationLists list-group list-group-flush p-1'>
                            {
                                conversations.length > 0?
                                    conversations.map((c)=> 
                                        <li className="userCardList list-group-item px-1 py-2" key={c._id}>
                                            <Card.Body className='userCard d-flex flex-row align-items-center p-0' onClick={()=>setCurrentChat(c)}>
                                                <Conversation conversation={c} currentUserId={user[0]?._id}/>
                                            </Card.Body>
                                        </li>
                                    ) : 
                                    <div >
                                        <Card style={{ width: '100%' }}>
                                            <Card.Body>
                                                <Card.Text>No Conversations</Card.Text>                  
                                            </Card.Body>
                                        </Card>
                                    </div>
                            }
                        </ul>                
                    </Card>
                </div>
            </div>
}
            {
                !onlinebarOpen ? null :                    
                <div className='sidebar p-2'>
                    <h5 className='ms-2 mt-2'>Friends Online</h5>
                    {
                        <ul className="list-group list-group-flush" id="listFriend">
                            {
                            onlineFriends.length >= 1 ?
                                onlineFriends.map((e)=>{
                                return <div key={e._id} className="list-group-item list-group-item-action p-0" style={{backgroundColor : "transparent"}}>
                                    <Button variant='none'>
                                    <li style={{listStyleType:"none",float:"left", gap:"5px", color : "white   "}} className='d-flex align-items-center'>
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
                    }
                </div>
            }
        </div>
    </>
    
}

export default ChatListBar