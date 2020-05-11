import React, { Component } from 'react'
import { withRouter }  from 'react-router-dom'
import { connect } from 'react-redux'
import { setOption } from '../../store/actions/optionActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Options extends Component {

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
    }

    scrollIntoViewIfNeeded = (element, container) => {
        let rectElem = element.getBoundingClientRect()
        let rectContainer = container.getBoundingClientRect()
        if (rectElem.bottom > rectContainer.bottom) { element.scrollIntoView(false) }
        if (rectElem.top < rectContainer.top) { element.scrollIntoView() }
    }

    componentDidMount() {
        // Scroll down to currently selected option, if one exists
        if (this.props.optionId) {
            const element = document.querySelector('.options .list-item.selected')
            const container = document.querySelector('div.options')
            this.scrollIntoViewIfNeeded(element, container)
        }
    }

    render() {
        return (
            <div className="options selections">
                {this.props.options.map(option => (
                    <div key={option._id} onClick={ () => {this.handleChangeOption(option._id)} } className={this.props.optionId === option._id ? "list-item selected" : "list-item"}>
                        <div className="page-title">{ option.titleStart }</div>
                        <div className="arrow">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                        </div>
                        <div className="page-title">{ option.titleFinish }</div>
                    </div>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Options))