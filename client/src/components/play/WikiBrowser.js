import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPageToPlaySession } from '../../store/actions/playActions'
import Loading from '../loading/Loading'
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
            .then(entryId => {
                // Redirect to view entry in 'Explore' page using newly created/returned entry id
                setTimeout(() => {
                    this.props.history.push(`/explore/${this.props.optionId}/${entryId}`)
                }, 2500)
            })
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
            <div id="wiki-browser">
                {this.props.loading ? <Loading /> : null}
                <h1 className="mb-4">{this.props.currentPageData.title || 'Loading...'}</h1>
                <input 
                    type="text" 
                    id="searchInput" 
                    className="search-bar" 
                    placeholder="Type to search through links..." 
                    onChange={this.handleChange} 
                    value={this.state.searchInput}
                    autoComplete="off"
                 />
                <div id="link-list">
                    {this.state.filteredLinks.map(link => {
                        if (link === this.props.titleFinish) {
                            return (
                                <button key={link} className="link-button target" onClick={() => {this.handleComplete(link)}}>{link}</button>
                            )
                        } else {
                            return (
                                <button key={link} className="link-button" onClick={() => {this.loadWiki(link)}}>{link}</button>
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
        optionId: state.option._id,
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
        addPageToPlaySession: (title) => dispatch(addPageToPlaySession(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WikiBrowser))
