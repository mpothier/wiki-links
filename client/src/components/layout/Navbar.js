import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'

class Navbar extends Component {
    resetPlay = () => {
        const {optionId, setOption} = this.props
        // Reset option play if option exists and already on matching 'play' route
        if (optionId && ('/play/' + optionId === this.props.location.pathname)) {
            setOption(optionId)
        }
    }

    render() {
        const {toggleModal, optionId} = this.props
        return (
            <div>
                <Link to='/' >
                    <h1>Home</h1>
                </Link>
                <Link to={ optionId ? '/play/' + optionId : '/play' } >
                    <h1 onClick={this.resetPlay}>Play</h1>
                </Link>
                <Link to={ optionId ? '/explore/' + optionId : '/explore' } >
                    <h1>Explore</h1>
                </Link>
                <h1 onClick={toggleModal} >Options</h1>
                <h1>About</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))
