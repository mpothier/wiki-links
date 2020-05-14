import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.scss'

const Header = ({ toggleSidebar, sidebarOpen, toggleAboutModal }) => {
    return (
        <div id="header-wrapper">
            <div className="icon">
                <FontAwesomeIcon icon={sidebarOpen ? 'times' : 'bars'} onClick={toggleSidebar} id="toggle"/>
            </div>
            <Link className='brand' to='/' >
                <span>Wikinexus</span>
            </Link>
            <div className="icon">
                <FontAwesomeIcon icon={['far', 'question-circle']} onClick={toggleAboutModal} id="toggle"/>
            </div>
        </div>
    )
}

export default Header
