import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loadEntriesFromLocalStorage } from '../../utils/localStorage'

import './Metrics.scss'

class Metrics extends Component {

    getEntryClassName = (entryId) => {
        const { optionId, match } = this.props
        const routeEntryId = match.params.entryId ? match.params.entryId : null

        var classes = ['entry-grid-item']

        // Add class if entryId matches route entryId
        if (routeEntryId) {
            if (routeEntryId === entryId) { classes.push('featured') }
        }

        // Add class if entryId found within localStorage
        if (loadEntriesFromLocalStorage(optionId).map(entry => entry._id).includes(entryId)) { classes.push('local') }
        // console.log(classes.join(' '))
        return classes.join(' ')
    }

    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.entryId && (this.props.match.params.entryId !== prevProps.match.params.entryId)) {
            // Hacky way to force class names to update! render() isn't doing it despite receiving correct values from getEntryClassName...
            // See issue https://github.com/facebook/react/issues/13260
            const element = document.querySelector(`.entry-grid #_${this.props.match.params.entryId}`)
            element.classList.add('featured')
        }
    }

    render() {
        const { data, highlightPathId, titleStart, titleFinish, entries, optionId, history, match } = this.props
        const routeEntryId = match.params.entryId ? match.params.entryId : null

        // Aggregation metrics
        const totalEntries = entries.length
        const avgEntryLength = totalEntries ? (entries.map(entry => entry.pageLinks.length).reduce((a, b) => a + b) / totalEntries).toFixed(1) : '-'
        const maxEntryLength = totalEntries ? Math.max(...entries.map(entry => entry.pageLinks.length)) : '-'
        const minEntryLength = totalEntries ? Math.min(...entries.map(entry => entry.pageLinks.length)) : '-'
        const sortedEntryFrequency = data.nodes ? data.nodes.filter(entry => entry.title !== titleStart && entry.title !== titleFinish)
            .sort((a, b) => (a.count < b.count) ? 1 : ((a.title > b.title) ? 1 : -1)) : []

        return (
            <React.Fragment>
                <section className="header">
                    <div className="title-text">{titleStart}</div>
                    <div className="arrow">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </div>
                    <div className="title-text">{titleFinish}</div>
                </section>
                <section className="entry-grid">
                    {entries.map(entry => {
                        return (
                            <div
                                id={'_' + entry._id}
                                className={this.getEntryClassName(entry._id)}
                                onClick={() => history.push(`/explore/${optionId}/${entry._id}`)}
                                onMouseEnter={() => highlightPathId(entry._id)}
                                onMouseOut={() => highlightPathId(null)}
                                key={entry._id}
                            ></div>
                        )
                    })}
                </section>
                <section className="content">
                    <div className="row metrics">
                        <div className="col-sm-6 entry-data">
                            {routeEntryId ? (
                                <div className="feature-content">
                                    <div className="score-wrapper">
                                        <div className="score">
                                            <span className="title">Score: </span>
                                            <span className="number">{entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.length}</span>
    
                                        </div>
                                    </div>
                                    <div className="highlighted-entry-list-wrapper">
                                        <div className="highlighted-entry-list">
                                            {entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.map((link, i) => {
                                                return (
                                                    <div key={link}>
                                                        <span className="mr-4">{ i + 1 }.</span>
                                                        <span>{ link }</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-text">Select an entry from the grid above</div>
                            )}
                        </div>
                        <div className="col-sm-6 option-data">
                            <div className="aggregate-data">
                                <div className="stats">
                                    <div className="stat">
                                        <span className="stat-title">Total Entries:</span>
                                        <span className="stat-number">{totalEntries}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-title">Average:</span>
                                        <span className="stat-number">{avgEntryLength}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-title">Shortest:</span>
                                        <span className="stat-number">{minEntryLength}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-title">Longest:</span>
                                        <span className="stat-number">{maxEntryLength}</span>
                                    </div>
                                </div>
                                <div className="common-links">
                                    <div className="title">Links by frequency:</div>
                                    <div className="link-list">
                                        {sortedEntryFrequency.map((node, i) => (
                                            <div className="link-data" key={node.title}>
                                                <span className="link-count">({node.count })</span>
                                                <span className="link-title">{ node.title }</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        optionId: state.option._id,
        titleStart: state.option.titleStart,
        titleFinish: state.option.titleFinish,
        entries: state.option.entries
    }
}

export default connect(mapStateToProps)(withRouter(Metrics))
