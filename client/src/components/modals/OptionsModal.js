import React, { Component } from 'react'
import { withRouter }  from 'react-router-dom'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'
import { addOption } from '../../store/actions/optionListActions'
import Spinner from 'react-bootstrap/Spinner';

import './OptionsModal.scss'

class OptionsModal extends Component {
    state = {
        showAddOption: false,
        verifyingNewOption: false,
        addOptionTitleStart: '',
        addOptionTitleFinish: ''
    }
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

    handleChangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({verifyingNewOption: true})
        this.props.addOption(this.state.addOptionTitleStart, this.state.addOptionTitleFinish)
            .then(res => {
                // Hide input form; user will then see new option populate in modal based on global state change
                this.toggleAddOptionInput()
                this.setState({verifyingNewOption: false})
            })
            .catch(err => {
                console.log('ERROR: ', err)
                // TODO: add form validation; if applicable, highlight which pages were not found, which were successful
                this.setState({verifyingNewOption: false})
            })
    }

    toggleAddOptionInput = () => {
        this.setState({
            showAddOption: !this.state.showAddOption
        })
    }

    render() {
        return (
            <div className="mask">
                <div className="modal-box">
                    {this.props.options.map(option => (
                        <div key={option._id} onClick={ () => {this.handleChangeOption(option._id)} } className="list-group-item">{ option.titleStart + ' >> ' + option.titleFinish }</div>
                    ))}
                    {this.state.showAddOption ? (
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" onChange={this.handleChangeInput} className="form-control" placeholder="Start Page" id="addOptionTitleStart" />
                                </div>
                                <span className="ml-1 mr-1">to</span>
                                <div className="col">
                                    <input type="text" onChange={this.handleChangeInput} className="form-control" placeholder="End Page" id="addOptionTitleFinish" />
                                </div>
                                <div className="">
                                    <button type="submit" className="btn btn-primary" disabled={this.state.verifyingNewOption}>{this.state.verifyingNewOption ? (
                                        <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />) : (<span>Add</span>)}</button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <button onClick={this.toggleAddOptionInput} >Add New Option</button>
                    )}
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
        setOption: (optionId) => dispatch(setOption(optionId)),
        addOption: (titleStart, titleFinish) => dispatch(addOption(titleStart, titleFinish))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OptionsModal))