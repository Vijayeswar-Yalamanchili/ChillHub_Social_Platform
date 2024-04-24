import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney,faCalendarPlus,faPeopleGroup,faComments,faGroupArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'

function Leftbar() {
  return <>
    <div className="leftBar">
      <div className="leftMenuText list-group list-group-flush mt-3">
        <Link to={'/home'} className="list-group-item list-group-item-action">
          <span className='d-flex align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faHouseChimney} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Home
          </span>
        </Link>
        <Link to={'/events'} className="list-group-item list-group-item-action">
          <span className='d-flex align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faCalendarPlus} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Birthdays
          </span>
        </Link>
        <Link to={'/friends'} className="list-group-item list-group-item-action">
          <span className='d-flex align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faPeopleGroup} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Friends
          </span>
        </Link>
        {/* <Link to={'/messages'} className="list-group-item list-group-item-action">
          <span className='d-flex align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faComments} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Messages
          </span>
        </Link> */}
        {/* <div className="dropdown">
          <Link to={''} className="list-group-item list-group-item-action">
            <span className='d-flex align-items-center' style={{gap:"5px"}}>
              <FontAwesomeIcon icon={faGroupArrowsRotate} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Pages
            </span>
          </Link>
          <div className="dropdown-content">
              <a href="#">Create Page</a>
              <a href="#">Page 1</a>
          </div>
        </div> */}
      </div>
      <div className="leftMenuIcon list-group list-group-flush mt-3">
        <Link to={'/home'} className="list-group-item list-group-item-action">
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faHouseChimney} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <Link to={'/events'} className="list-group-item list-group-item-action mt-2">
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faCalendarPlus} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <Link to={'/friends'} className="list-group-item list-group-item-action mt-2">
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faPeopleGroup} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        {/* <Link to={'/messages'} className="list-group-item list-group-item-action mt-2">
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faComments} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link> */}
        
      </div>
      {/* <div className="leftMenuIconRow list-group mt-3 d-flex flex-row" style={{width : "25rem"}}>
        <Link to={'/home'} className="list-group-item list-group-item-action" style={{width:"12rem", height:"2rem", borderTop : "none", borderTopRightRadius : "0px", borderTopLeftRadius : "0px"}}>
          <span className='d-flex justify-content-center align-items-center' style={{gap:"25px"}}>
            <FontAwesomeIcon icon={faHouseChimney} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <Link to={'/events'} className=" list-group-item list-group-item-action" style={{width:"12rem", height:"2rem"}}>
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faCalendarPlus} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <Link to={'/friends'} className=" list-group-item list-group-item-action" style={{width:"12rem", height:"2rem"}}>
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faPeopleGroup} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <Link to={'/messages'} className=" list-group-item list-group-item-action" style={{width:"12rem", height:"2rem"}}>
          <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
            <FontAwesomeIcon icon={faComments} size='xl' style={{color: "#EB8D8D", width:"18px", height:"18px"}}/>
          </span>
        </Link>
        <div className="dropdown">
          <Link to={''} className="list-group-item list-group-item-action" style={{width:"12rem", height:"2rem"}}>
            <span className='d-flex justify-content-center align-items-center' style={{gap:"5px"}}>
              <FontAwesomeIcon icon={faGroupArrowsRotate} size='xl' style={{color: "#EB8D8D", width:"18px", height:"16px"}}/>Pages
            </span>
          </Link>
          <div className="dropdown-content">
              <a href="#">Create Page</a>
              <a href="#">Page 1</a>
          </div>
        </div>
      </div> */}
    </div>
  </>
}

export default Leftbar