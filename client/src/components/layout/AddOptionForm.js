import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner';
import { addOption } from '../../store/actions/optionListActions'

class AddOptionForm extends Component {
    state = {
        verifyingNewOption: false,
        addOptionTitleStart: '',
        addOptionTitleFinish: ''
    }

    handleChangeInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ verifyingNewOption: true })
        this.props.addOption(this.state.addOptionTitleStart, this.state.addOptionTitleFinish)
            .then(res => {
                // Hide input form; user will then see new option populate in modal based on global state change
                this.setState({ verifyingNewOption: false })
                this.props.toggleAddOptionInput()
            })
            .catch(err => {
                console.log('ERROR: ', err)
                // TODO: add form validation; if applicable, highlight which pages were not found, which were successful
                this.setState({ verifyingNewOption: false })
            })
    }

    render() {
        return (
            <div id="new-option-form" >
                <div className="inputs">
                    <input type="text" onChange={this.handleChangeInput} className="input-field" placeholder="Start page..." id="addOptionTitleStart" autoComplete="off"/>
                    <input type="text" onChange={this.handleChangeInput} className="input-field" placeholder="Finish page..." id="addOptionTitleFinish" autoComplete="off"/>
                </div>
                <div className="buttons">
                    <button onClick={this.handleSubmit} className="submit" disabled={this.state.verifyingNewOption}>
                        {this.state.verifyingNewOption ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <span>Add</span>
                        )}
                    </button>
                    <button className="cancel" onClick={this.props.toggleAddOptionInput} >
                        <span>Cancel</span>
                    </button>
                </div>
                {/* <div className="form-row">
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
                </div> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addOption: (titleStart, titleFinish) => dispatch(addOption(titleStart, titleFinish))
    }
}

export default connect(null, mapDispatchToProps)(AddOptionForm)
