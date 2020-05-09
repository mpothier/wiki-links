import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

import './LinkChart.scss'

class LinkChart extends Component {
    state = {
        data: {
            nodes: null,
            links: null
        }
    }

    drawLinkChart = () => {
        const canvasHeight = 400
        const canvasWidth = 600
        const margin = 50

        // Re-map positions to canvas scale
        var posX = d3.scaleLinear()
            .domain([0, 1])
            .range([margin, canvasWidth - margin])
        var posY = d3.scaleLinear()
            .domain([0, 1])
            .range([margin, canvasHeight - margin])

        // DOM manipulations
        const svgCanvas = d3.select('#chart-canvas')
            .append('svg')
            .attr('width', canvasWidth)
            .attr('height', canvasHeight)
            .style('border', '1px solid grey')

        svgCanvas
            .append('rect')
            .attr('width', canvasWidth - (margin * 2))
            .attr('height', canvasHeight - (margin * 2))
            .attr('x', margin)
            .attr('y', margin)
            .style('stroke', 'grey')
            .style('fill', 'none')

        svgCanvas.append('g').selectAll('circle')
            .data(this.state.data.nodes).enter()
            .append('circle')
            .attr('r', (d) => d.count / 6 * margin)
            .attr('cy', (d) => posY(d.position))
            .attr('cx', (d) => posX(d.position))
            .style('fill', 'rgba(0,0,0,0.25)')
    }
    
    drawLinkChart2 = () => {
        const canvasHeight = 400
        const canvasWidth = 600
        const margin = 50
        const routeEntryId = this.props.entryId
        const entries = this.props.entries

        // SVG setup
        var svgCanvas = (d3.select('svg').size() > 0) ? (
            d3.select('svg')
        ) : (
            d3.select('#chart-canvas')
                .append('svg')
                .attr('width', canvasWidth)
                .attr('height', canvasHeight)
                .style('border', '1px solid rgba(0,0,0,0.2)')
        )

        // Re-map positions to canvas scale
        var posX = d3.scaleLinear()
            .domain([0, 1])
            .range([margin, canvasWidth - margin])
        var posY = d3.scaleLinear()
            .domain([0, 1])
            .range([margin, canvasHeight - margin])
        var repelStrength = d3.scaleLinear()
            .domain([0, 0.5])
            .range([0, 1])

        // Drag simulations
        const drag = simulation => {

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        const addFeatureTooltips = (d) => {
            console.log(d)
        }

        // Force simulations
        const forceX = d3.forceX((d) => posX(d.position)).strength(0.8)
        const forceY = d3.forceY((d) => posY(d.position)).strength(0.8)
        const linkForce = d3.forceLink().id((d) => d.title).strength(0)//.distance(10)
        const simulation = d3.forceSimulation()
            .force('link', linkForce)
            .force("x", forceX)
            .force("y", forceY)
            .force("collide", d3.forceCollide().radius((d) => (d.count/6)*140).iterations(1))
            // .force("collide", d3.forceCollide().radius((d) => (1-repelStrength(Math.abs(0.5-d.position)))*30 + (d.count/6)*80).iterations(1))
            // .force("center", d3.forceCenter(canvasWidth / 2, canvasHeight / 2))  

        // Link (line) construction
        const linkElements = svgCanvas.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.state.data.links)
            .enter().append('line')
                .attr('id', (d) => d.entryId)
                .attr('class', 'link')
                .classed('featured', (d) => (this.props.entryId === d.entryId))
                .on('mouseover', handleLinkMouseOver)
                .on('mouseout', handleLinkMouseOut)
         
        // Node construction
        const nodeElements = svgCanvas.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.state.data.nodes)
            .enter().append("circle")
                .attr('id', (d) => d.title)
                .attr('class', 'node')
                .attr("r", (d) => (d.count / 6) * 30)
                .classed('featured', (d) => routeEntryId ? entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.includes(d.title) : false)
                .on("mouseover", handleNodeMouseOver)
                .on("mouseout", handleNodeMouseOut)
                .call(drag(simulation))
                // .each(function(n) {
                //     if (!routeEntryId) {return}
                //     if (entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.includes(n.title)) {
                //         // addFeatureTooltips(this)
                //         // console.log(this)
                //         d3.select('#chart-canvas').append("div")
                //             .attr("class", "d3-tooltip featured")
                //             .call(() => console.log(this.getAttributeNames()))
                //             .html(n.title)
                //             .style('left', this.getAttribute('cx') -10 + 'px')
                //             .style('top', this.getAttribute('cy') - (Number(this.getAttribute('r')) + 20) + 'px')
                //     }
                // })

        // Run simulation
        simulation.nodes(this.state.data.nodes)
            // .on("tick", () => {
            //     nodeElements
            //         .attr('cx', (d) => d.x)
            //         .attr('cy', (d) => d.y)
            //     linkElements
            //         .attr('x1', (d) => d.source.x)
            //         .attr('y1', (d) => d.source.y)
            //         .attr('x2', (d) => d.target.x)
            //         .attr('y2', (d) => d.target.y)
            // })
            .on('tick', tick)
            .on('end', () => {
                // console.log('finished....')
                // Highlight featured link chain
                d3.selectAll('.link.featured')
                    .classed('highlight', true)
                // Add tooltips for featured nodes
                d3.selectAll('.node')
                    .each(function(n) {
                        if (!routeEntryId) {return}
                        if (entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.includes(n.title)) {
                            // addFeatureTooltips(this)
                            // console.log(this)
                            d3.select('#chart-canvas').append("div")
                                .attr("class", "d3-tooltip featured")
                                .html(n.title)
                                .style('left', this.getAttribute('cx') -10 + 'px')
                                .style('top', this.getAttribute('cy') - (Number(this.getAttribute('r')) + 20) + 'px')
                        }
                    })
            })

        simulation.force('link').links(this.state.data.links)

        // Custom settings: constrain movement within canvas bounds
        function tick() {
            nodeElements
                .attr("cx", function(d) { return d.x = Math.max(this.getAttribute('r'), Math.min(canvasWidth - this.getAttribute('r'), d.x)); })
                .attr("cy", function(d) { return d.y = Math.max(this.getAttribute('r'), Math.min(canvasHeight - this.getAttribute('r'), d.y)); });
        
            linkElements
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y)
          }

        // Create Event Handlers for mouse
        function handleNodeMouseOver(d, i) {
            // Use D3 to select element, change color and size
            d3.select(this)
                .attr('r', this.getAttribute('r') * 1.35)
                .classed('highlight', true)
            
            // Add tooltip
            d3.select('#chart-canvas').append("div")
                .attr("class", "d3-tooltip")
                .classed('featured', () => {
                    return d3.select(this).classed('featured') ? true : false
                })
                .html(d.title)
                .style('left', this.getAttribute('cx') - 10 + 'px')
                .style('top', this.getAttribute('cy') - (Number(this.getAttribute('r')) + 20) + 'px')
        }

        function handleNodeMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this)
                .attr('r', this.getAttribute('r') / 1.35)
                .classed('highlight', false)
            // Remove tooltips
            d3.selectAll('.d3-tooltip').remove();
        }

        function handleLinkMouseOver(d, i) {
            // Highlight selected link chain
            d3.selectAll('.link')
                .classed('highlight', (link) => {
                    return (link.entryId === d.entryId) ? true : false
                })
                .classed('downlight', (link) => {
                    return (link.entryId === d.entryId) ? false : true
                })
            
            // Select and style corresponding nodes
            const entryNodes = entries.filter(entry => entry._id === d.entryId)[0].pageLinks
            d3.selectAll('.node')
                .each(function(n) {
                    if (entryNodes.includes(n.title)) {
                        // Set/un-set classes based on entryId
                        d3.select(this)
                            .classed('connected', true)
                            .classed('featured', () => {
                                return (routeEntryId === d.entryId) ? true : false
                            })

                        // Add tooltips
                        d3.select('#chart-canvas').append("div")
                            .attr("class", "d3-tooltip")
                            .classed('featured', () => {
                                return d3.select(this).classed('featured') ? true : false
                            })
                            .html(n.title)
                            .style('left', this.getAttribute('cx') - 10 + 'px')
                            .style('top', this.getAttribute('cy') - (Number(this.getAttribute('r')) + 20) + 'px')
                    } else {
                        d3.select(this)
                            .classed('downlight', true)
                    }
                })
        }

        function handleLinkMouseOut(d, i) {
            // Unlighlight selected link chain
            d3.selectAll(`[id="${d.entryId}"]`)
                .classed('highlight', false)

            // Remove downlights
            d3.selectAll('.downlight')
                .classed('downlight', false)
            
            // Reset node styles
            d3.selectAll('.node')
                .classed('connected', false)
                .classed('featured', (n) => (routeEntryId ? ((entries.filter(entry => entry._id === routeEntryId)[0].pageLinks.includes(n.title)) ? true : false) : false))
            
            // Remove tooltips
            d3.selectAll('.d3-tooltip').remove();
        }
    }

    processData = (entries) => {
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
                    linkList.push({source: title, target: nextTitle, entryId: entry._id})
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

    redrawChart = () => {
        d3.selectAll('g')
            .remove()
        d3.selectAll('.d3-tooltip')
            .remove()
        this.drawLinkChart2()
    }

    componentDidMount() {
        this.processData(this.props.entries)
    }

    componentDidUpdate(prevProps, prevState, snapshop) {
        // Re-process data when new entry list is received
        if ((this.props.entries !== prevProps.entries) && (this.props.entries !== null)) {
            this.processData(this.props.entries)
        }
        // Re-render if route parameter changed
        if (this.props.entryId !== prevProps.entryId) {
            this.redrawChart()
        }
        // Re-render chart when data in state is updated (i.e. after being re-processed)
        if (this.state.data !== prevState.data) {
            this.redrawChart()
        }
    }

    render() { return <div id='chart-canvas'></div> }
}

const mapStateToProps = (state, ownProps) => {
    return {
        entries: state.option.entries
    }
}

export default connect(mapStateToProps)(LinkChart)