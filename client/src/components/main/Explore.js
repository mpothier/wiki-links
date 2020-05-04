import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'
import { loadEntriesFromLocalStorage } from '../../utils/localStorage'

class Explore extends Component {
    componentDidMount() {
        const paramsOptionId = this.props.match.params.optionId
        if (paramsOptionId) {
            // Set global state "option" based on specified URL param
            this.props.setOption(paramsOptionId)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshop) {
        const paramsOptionId = this.props.match.params.optionId
        const prevParamsOptionId = prevProps.match.params.optionId
        // Set global state "option" based on specified URL param
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
                        <div className="text-center mb-4">
                            <h1>
                                {this.props.titleStart + '  >>  ' + this.props.titleFinish}
                            </h1>
                        </div>
                        <div>
                            <h3>All Entries for Option</h3>
                            {this.props.entries.map(entry => {
                                return (
                                    <div key={entry}>{entry.id}</div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Local Storage Entries for Option</h3>
                            {loadEntriesFromLocalStorage(this.props.optionId).map(entry => {
                                return (
                                    <div key={entry.id}>{entry.id}</div>
                                )
                            })}
                        </div>
                        {this.props.match.params.entryId ? (
                            <div>
                                <h3>Entry Link List</h3>
                                {this.props.entries.filter(entry => entry.id === this.props.match.params.entryId)[0]?.links.map(link => {
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
        optionId: state.option.id,
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
