import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'
import Options from './Options'
import AddOptionForm from './AddOptionForm'
import IconExplore from '../icons/IconExplore'
import IconPlay from '../icons/IconPlay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Navbar.scss'

class Sidebar extends Component {
    state = {
        showAddOption: false,
    }

    resetPlay = () => {
        const { optionId, location } = this.props
        // Reset option play if option exists and already on matching 'play' route
        if (optionId && ('/play/' + optionId === location.pathname)) {
            setOption(optionId)
        }
    }

    selectedMode = () => {
        var pathRoot = /\/([^/]+)/g.exec(this.props.location.pathname)
        return pathRoot ? pathRoot[1] : null
    }

    handleSidebarClick = (e) => {
        const selection = document.querySelector('div.sidebar')
        if (!e.path.includes(selection)) {
            this.props.toggleSidebar()
        }
    }

    toggleAddOptionInput = () => {
        this.setState({
            showAddOption: !this.state.showAddOption
        })
    }

    componentDidMount() {
        // Close sidebar when click occurs away from sidebar
        document.addEventListener('click', this.handleSidebarClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleSidebarClick)
    }

    render() {
        const { sidebarClass, optionId } = this.props
        return (
            <div className={sidebarClass}>
                <section className="section-top">
                    <div className="divider">
                        <hr />
                        <span>MODE</span>
                        <hr />
                    </div>
                    <div className="mode selections">
                        <div className={this.selectedMode() === "play" ? "list-item selected" : "list-item"}>
                            <Link to={optionId ? '/play/' + optionId : '/play'} >
                                <div className="icon">
                                <IconPlay />
                                </div>
                                <div onClick={this.resetPlay}>Play</div>
                            </Link>
                        </div>
                        <div className={this.selectedMode() === "explore" ? "list-item selected" : "list-item"}>
                            <Link to={optionId ? '/explore/' + optionId : '/explore'} >
                                <div className="icon">
                                    <IconExplore />
                                </div>
                                <div>Explore</div>
                            </Link>
                        </div>
                    </div>
                    <div className="divider">
                        <hr />
                        <span>OPTION</span>
                        <hr />
                    </div>
                </section>
                <section className="section-middle">
                    <Options optionId={optionId} />
                </section>
                <section className="section-bottom">
                    <div id="add-option">
                        <hr />
                        {this.state.showAddOption ? (
                            <AddOptionForm toggleAddOptionInput={this.toggleAddOptionInput} />
                        ) : (
                            <div id="add-option-btn" onClick={this.toggleAddOptionInput} >
                                <span>Add New Option</span>
                                <FontAwesomeIcon icon={['fas', 'plus']} />
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        optionId: state.option._id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOption: (optionId) => dispatch(setOption(optionId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))
