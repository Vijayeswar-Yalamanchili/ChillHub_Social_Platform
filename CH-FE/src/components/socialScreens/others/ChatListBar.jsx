import React, {useState,useEffect,useContext} from 'react'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import AxiosService from '../../../utils/AxiosService'
import ApiRoutes from '../../../utils/ApiRoutes'
import Conversation from './Conversation'
import RightBar from '../common/Rightbar'
import { UserContext } from '../../../contextApi/UsersContextComponent'

function ChatListBar({onlineUsers,currentChat, setCurrentChat,conversations}) {
    const {user} = useContext(UserContext)
    const [searchChatQuery, setSearchChatQuery] = useState("")
    const [conversation, setConversation] = useState("")
    const [searchChatResults, setSearchChatResults] = useState([])
    let getToken = localStorage.getItem('loginToken')

    const handleSearchChange = (searchValue) => {
        setSearchChatQuery(searchValue)
        getSearchChatUser(searchValue)
    }

    const getSearchChatUser = async(searchValue) => {
        try {
            let res = await AxiosService.get(`${ApiRoutes.SEARCHCHATUSER.path}/${user[0]._id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            let result = res.data.searchDatas
            let usersList = result.filter((e)=> e._id !== user[0]?._id)
            let filteredData = usersList.filter((user)=> {
                return searchValue && user && (user.firstName + user.lastName) && (user.firstName + user.lastName).toLowerCase().includes(searchValue)
            })
            setSearchChatResults(filteredData)
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    const handleAddConversation = async(friendId) => {
        try {
            let checkConvo = await AxiosService.get(`${ApiRoutes.GETCONVERSATIONS.path}/${user[0]?._id}`,{ headers : { 'Authorization' : ` ${getToken}`}})
            let checkConvoResult = checkConvo.data.getConversations
            let isConvoExist = checkConvoResult.filter((e)=> e.members[1] === friendId)
            setSearchChatQuery("")
            if(!isConvoExist[0]){
                let convoBody = {
                    members : [user[0]?._id,friendId],
                    conversationStatus:false
                }
                const addConvo = await AxiosService.post(`${ApiRoutes.ADDNEWCONVERSATIONS.path}`,convoBody)
                const result = addConvo.data.addConv
                if(addConvo===200){ 
                    setConversation(result)
                }
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response.data.message || error.message)
        }
    }

    return <div className='messagesRightbar'>
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
                            conversations.map((c)=> 
                                <li className="userCardList list-group-item px-0 py-2" key={c._id}>
                                    <Card.Body className='userCard d-flex flex-row align-items-center p-0' onClick={()=>setCurrentChat(c)}>
                                        <Conversation conversation={c} currentUserId={user[0]?._id}/>
                                    </Card.Body>
                                </li>
                            )
                        }
                    </ul>                
                </Card>
            </div>
        </div>
        <hr/>
        <RightBar onlineUsers={onlineUsers} setCurrentChat={setCurrentChat} user={user}/>
    </div>
}

export default ChatListBar