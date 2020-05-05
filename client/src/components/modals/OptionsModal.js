import React, { Component } from 'react'
import { withRouter }  from 'react-router-dom'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'

import './OptionsModal.scss'

class OptionsModal extends Component {
    handleChangeOption = (optionId) => {
        const redirectRoutes = ['play', 'explore']
        var pathRoot = /\/([^/]+)/g.exec(this.props.location.pathname)
        pathRoot = pathRoot ? pathRoot[1] : null
        if (redirectRoutes.includes(pathRoot)) {
            // Re-route to URL with :optionId based on selection, if current path root is 'play' or 'explore'
            this.props.history.push(`/${pathRoot}/${optionId}`)
        } else {
            // Set option in global state
            this.props.setOption(optionId)
        }
        this.props.closeModal()
    }

    render() {
        return (
            <div className="mask">
                <div className="modal-box">
                    {this.props.options.map(option => (
                        <div key={option._id} onClick={ () => {this.handleChangeOption(option._id)} } className="list-group-item">{ option.titleStart + ' >> ' + option.titleFinish }</div>
                    ))}
                    <hr />
                    <button onClick={this.props.closeModal} >Close</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        options: state.optionList.options,
        loading: state.optionList.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOption: (optionId) => dispatch(setOption(optionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OptionsModal))