import React, { Component } from 'react';
import { connect } from 'react-redux';
import WikiBrowser from '../play/WikiBrowser'
import PlayPagesList from '../play/PlayPagesList'
import PlayComplete from '../play/PlayComplete'
import { setOption } from '../../store/actions/optionActions'

class Play extends Component {
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
    } else if (this.props.complete === true) {
      return (
        <PlayComplete />
      )
    } else {
      return (
        <div className="play">
          <div className="container">
            <div className="text-center mb-4">
              <h1>
                {this.props.titleStart + '  >>  ' + this.props.titleFinish}
              </h1>
            </div>
            <div className="row">
              <div className="col-2 pr-4">
                <PlayPagesList />
              </div>
              <div className="col-10">
                <WikiBrowser />
              </div>
            </div>
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
    complete: state.play.complete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOption: (optionId) => dispatch(setOption(optionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);
