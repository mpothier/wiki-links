import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPageToPlaySession } from '../../store/actions/playActions'
import { addEntryToOption } from '../../store/actions/optionActions'
import Loading from '../loading/Loading'
import { saveEntryToLocalStorage } from '../../utils/localStorage'
import './WikiBrowser.scss';

class WikiBrowser extends Component {
    state = {
        searchInput: '',
        filteredLinks: []
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleComplete = (title) => {
        this.props.addPageToPlaySession(title)
        // wait for Promise return with auto-generated entry uuid, then.....
        const entryId = Math.random() * 100
        // Add entry to global state for option
        this.props.addEntryToOption(entryId)
        // Save entry to local storage
        saveEntryToLocalStorage(this.props.optionId, entryId, this.props.pageList.map(page => page.title))
        // Redirect to view entry in 'Explore' page
        setTimeout(() => {
            this.props.history.push(`/explore/${this.props.optionId}/${entryId}`)
        }, 3000)
    }
    filterLinks = () => {
        var query = this.state.searchInput.toLowerCase();
        var filteredLinks = this.props.currentPageLinks.filter(link => {
            return link.toLowerCase().includes(query)
        })
        this.setState({
            ...this.state,
            filteredLinks
        })
    }
    loadWiki = (title) => {
        if (title === this.props.currentPageData.title) {
            console.log("oops!");
            return
        }
        this.props.addPageToPlaySession(title)
    }
    componentDidMount() {
        // Initialize component state
        this.setState({
            ...this.state,
            searchInput: '',
            filteredLinks: this.props.currentPageLinks
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // Re-initialize component state when global 'play' state updates (i.e. new Wiki page loaded)
        if (prevProps.currentPageData.title !== this.props.currentPageData.title) {
            this.setState({
                ...this.state,
                searchInput: '',
                filteredLinks: this.props.currentPageLinks
            })
        }
        // Re-filter page links when search input field is updated
        if (this.state.searchInput !== prevState.searchInput) {
            this.filterLinks()
        }
    }
    render() {
        return (
            <div id="wiki-browser" className="container">
                {this.props.loading ? <Loading /> : null}
                <h1 className="mb-4">{this.props.currentPageData.title || 'Loading...'}</h1>
                <input type="text" id="searchInput" className="form-control" placeholder="Search links..." onChange={this.handleChange} value={this.state.searchInput}/>
                <div id="link-list">
                    {this.state.filteredLinks.map(link => {
                        if (link === this.props.titleFinish) {
                            return (
                                <button key={link} style={{backgroundColor: '#8af68a'}} className="btn btn-light mr-2 mb-2" onClick={() => {this.handleComplete(link)}}>{link}</button>
                            )
                        } else {
                            return (
                                <button key={link} className="btn btn-light mr-2 mb-2" onClick={() => {this.loadWiki(link)}}>{link}</button>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        optionId: state.option.id,
        titleStart: state.option.titleStart,
        titleFinish: state.option.titleFinish,
        optionLoading: state.option.loading,
        currentPageData: state.play.currentPageData,
        currentPageLinks: state.play.currentPageLinks,
        loading: state.play.loading,
        pageList: state.play.pageList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPageToPlaySession: (title) => dispatch(addPageToPlaySession(title)),
        addEntryToOption: (entryId) => dispatch(addEntryToOption(entryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WikiBrowser))
