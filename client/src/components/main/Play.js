import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WikiBrowser from '../play/WikiBrowser'
import PlayPagesList from '../play/PlayPagesList'
import PlayComplete from '../play/PlayComplete'
import { setOption } from '../../store/actions/optionActions'

import './Play.scss'

class Play extends Component {
    componentDidMount() {
        const paramsOptionId = this.props.match.params.optionId
        if (paramsOptionId) {
            // Set global state "option" based on specified URL param
            this.props.setOption(paramsOptionId)
                .catch(() => {
                    // Re-route to root 'explore' page if no option exists by specified option id
                    this.props.history.push('/play')
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
                    <div className="empty-option"><span>Select an option from the sidebar menu</span></div>
                </>
            )
        } else if (this.props.complete === true) {
            return (
                <PlayComplete />
            )
        } else {
            return (
                <div className="play">
                    <div className="container-wrapper">
                        <div className="container">
                            <section className="header">
                                <div className="header-page">
                                    <div className="title-description">Source:</div>
                                    <div className="header-title">
                                        {this.props.titleStart}
                                    </div>
                                </div>
                                <div className="header-page">
                                    <div className="title-description">Target:</div>
                                    <div className="header-title">
                                        {this.props.titleFinish}
                                    </div>
                                </div>
                            </section>
                            <section className="content">
                                <div className="row">
                                    <div className="d-none d-md-block col-md-2">
                                        <PlayPagesList />
                                    </div>
                                    <div className="col-md-10 .col-sm-12">
                                        <WikiBrowser />
                                    </div>
                                </div>
                            </section>
                        </div>
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
        complete: state.play.complete
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOption: (optionId) => dispatch(setOption(optionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
