import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkChart from '../explore/LinkChart'
import { setOption } from '../../store/actions/optionActions'
import { loadEntriesFromLocalStorage } from '../../utils/localStorage'

class Explore extends Component {

    state = {
        pathIdToHighlight: null
    }

    componentDidMount() {
        const paramsOptionId = this.props.match.params.optionId
        if (paramsOptionId) {
            // Set global state "option" based on specified URL param
            this.props.setOption(paramsOptionId)
                .catch(() => {
                    // Re-route to root 'explore' page if no option exists by specified option id
                    this.props.history.push('/explore')
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshop) {
        const paramsOptionId = this.props.match.params.optionId
        const prevParamsOptionId = prevProps.match.params.optionId
        // Set global state "option" based on specified URL param (e.g. when new option selected from Options modal)
        if ((prevParamsOptionId !== paramsOptionId) && paramsOptionId) {
            this.props.setOption(paramsOptionId)
        }
    }

    render() {
        if (!this.props.optionId) {
            return (
                <>
                    <h2>Select an option from the sidebar</h2>
                </>
            )
        } else {
            return (
                <div className="explore">
                    <div className="container">
                        <LinkChart highlightId={this.state.pathIdToHighlight} entryId={this.props.match.params.entryId ? this.props.match.params.entryId : null} optionId={this.props.optionId}/>
                        <div className="text-center mb-4">
                            <h1>
                                {this.props.titleStart + '  >>  ' + this.props.titleFinish}
                            </h1>
                        </div>
                        <div>
                            <h3>All Entries for Option</h3>
                            {this.props.entries.map(entry => {
                                return (
                                    <div key={entry._id}>{entry._id}</div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Local Storage Entries for Option</h3>
                            {loadEntriesFromLocalStorage(this.props.optionId).map(entry => {
                                return (
                                    <div
                                        onClick={() => this.props.history.push(`/explore/${this.props.match.params.optionId}/${entry._id}`)}
                                        onMouseEnter={() => this.setState({pathIdToHighlight: entry._id})}
                                        onMouseOut ={() => this.setState({pathIdToHighlight: null})}
                                        key={entry._id}
                                    >{entry._id}</div>
                                )
                            })}
                        </div>
                        {this.props.match.params.entryId ? (
                            <div>
                                <h3>Entry Link List</h3>
                                {this.props.entries.filter(entry => entry._id === this.props.match.params.entryId)[0]?.pageLinks.map(link => {
                                    return (
                                        <div key={link}>{link}</div>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        optionId: state.option._id,
        titleStart: state.option.titleStart,
        titleFinish: state.option.titleFinish,
        optionLoading: state.option.loading,
        entries: state.option.entries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOption: (optionId) => dispatch(setOption(optionId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
