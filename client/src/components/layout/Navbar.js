import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import AboutModal from '../modals/AboutModal'

import './Navbar.scss'

class Navbar extends Component {
    state = {
        sidebarOpen: false,
        sidebarClass: 'sidebar closed',
        showModal: false
    }

    toggleSidebar = () => {
        if (!this.state.sidebarOpen) {
            this.setState({ sidebarOpen: true, sidebarClass: 'sidebar' })
        } else {
            this.setState({ sidebarClass: 'sidebar closed' })
            setTimeout(() => this.setState({ sidebarOpen: false }), 500)
        }
    }

    toggleAboutModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        const { toggleModal } = this.props
        return (
            <div id='navbar'>
                <Header toggleSidebar={this.toggleSidebar} sidebarOpen={this.state.sidebarOpen} toggleAboutModal={this.toggleAboutModal} />
                {this.state.sidebarOpen ? <Sidebar toggleSidebar={this.toggleSidebar} sidebarClass={this.state.sidebarClass} toggleAboutModal={this.toggleAboutModal} /> : null}
                {this.state.showModal ? <AboutModal closeModal={this.toggleAboutModal} /> : null}
            </div>
        )
    }
}

export default Navbar
