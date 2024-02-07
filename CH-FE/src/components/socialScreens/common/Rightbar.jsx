import React from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons'

function Rightbar() {
  let frdsList = ["Ram","Vijayeswar","San","kumar","Jhon","Raman","Vijay Kumar","Eshwar","Sandy","kumaresan","James"]
  return <>
  <div className="rightBar">
    {/* <div className="addBlock">
        <img src="" alt=""/>
    </div> */}
    <div className="friendsList mt-3">
        <h5>Friends Online</h5>
        <ul className="list-group list-group-flush" id="listFriend">
          {
            frdsList.map((e,i)=>{
              return <div key={i} className="list-group-item list-group-item-action p-0">
                <Button variant='none'>
                  <li style={{listStyleType:"none",float:"left", gap:"5px"}} className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#46F443", width:"8px"}}/>{e}
                  </li>
                </Button>
              </div>
            })
          }
        </ul>
    </div>
  </div>
  </>
}

export default Rightbar