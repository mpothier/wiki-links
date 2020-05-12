import React, { Component } from 'react'
import { connect } from 'react-redux'
import LinkChart from '../explore/LinkChart'
import Metrics from '../explore/Metrics'
import { setOption } from '../../store/actions/optionActions'

import './Explore.scss'

class Explore extends Component {

    state = {
        pathIdToHighlight: null,
        data: {}
    }

    highlightPathId = (entryId) => {
        this.setState({ pathIdToHighlight: entryId })
    }

    aggregateData = (entries) => {
        var nodeMap = {}
        var linkList = []
        // Aggregate data across all entries into node map and array of link objects
        entries.forEach(entry => {
            const totalLinks = entry.pageLinks.length
            for (let i = 0; i < totalLinks; i++) {
                const title = entry.pageLinks[i]
                const nextTitle = (i + 1 < totalLinks) ? entry.pageLinks[i + 1] : null
                // Process NODE
                const position = i / (totalLinks - 1)  // normalized between 0 and 1
                if (title in nodeMap) {
                    nodeMap[title].count += 1
                    nodeMap[title].positions.push(position)
                } else {
                    nodeMap[title] = { count: 1, positions: [position] }
                }
                // Process LINK
                if (title && nextTitle) {
                    linkList.push({ source: title, target: nextTitle, entryId: entry._id })
                }
            }
        });
        // Convert into simple object array for d3
        const nodeList = Object.entries(nodeMap).map(node => {
            return {
                title: node[0],
                count: node[1].count,  // frequency
                position: node[1].positions.reduce((a, b) => a + b) / node[1].positions.length  // average of normalized positions
            }
        })
        // Update component state
        this.setState({
            data: {
                ...this.state.data,
                nodes: nodeList,
                links: linkList
            }
        })
    }

    componentDidMount() {
        this.aggregateData(this.props.entries)

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

        // Re-process data when new entry list is received
        if ((this.props.entries !== prevProps.entries) && (this.props.entries !== null)) {
            this.aggregateData(this.props.entries)
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
                    <div className="container-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 chart-wrapper">
                                    <LinkChart data={this.state.data} highlightId={this.state.pathIdToHighlight} entryId={this.props.match.params.entryId ? this.props.match.params.entryId : null} optionId={this.props.optionId}/>
                                    <div className="caption">
                                        Node radius is proportional to frequency among aggregrated entry data. Node position along the diagonal is approximately proportional to average 
                                        page position among entries in which it is included (top-left='start', bottom-right='finish'); additional collision physics has been added to 
                                        space apart nodes and link chains.
                                    </div>
                                </div>
                                <div className="col-lg-6 metrics-wrapper">
                                    <Metrics data={this.state.data} highlightPathId={this.highlightPathId}/>
                                </div>
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
        optionId: state.option._id,
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
