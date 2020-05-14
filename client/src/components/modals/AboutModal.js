import React, { Component } from 'react'

import './AboutModal.scss'

class AboutModal extends Component {

    handleModalClick = (e) => {
        const selection = document.querySelector('div.modal-box')
        if (!e.path.includes(selection)) {
            this.props.closeModal()
        }
    }

    componentDidMount() {
        // Close sidebar when click occurs away from sidebar
        document.addEventListener('click', this.handleModalClick)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleModalClick)
    }

    render() {
        return (
            <div className="mask">
                <div className="modal-box">
                    <section>
                        <h3>About</h3>
                        <p>This project aims to explore our cognitive and cultural associations between discrete topics in our shared world of knowledge. How does the mind
                        store and recall the concept of <i>apple</i> versus that of <i>supernova</i>? By challenging one to find links between otherwise unrelated concepts, 
                        we are able to draw a map that traces the human thought process, yielding opportunities to analyze and understand aggregated patterns of association.</p>
                        <p>Inspiration was taken from the "wiki-wars" game, in which one is tasked with navigating from one Wikipedia page to another by clicking only on 
                        links found within the articles themselves. As an open, collaborative encyclopedia, Wikipedia is a resource that systematizes the documentation 
                        and categorization of a vast quantity of shared knowledge. While "wiki-wars" traditionally has a competitive spin (e.g. head-to-head with others to see who can 
                        reach the end in the shortest time, or in the shortest number of clicks), this project seeks to collect as many different paths as possible in order 
                        to create a rich set of data, from which we will be able to run more robust analyses. As such, the initial effort prioritizes depth over breadth of combinations.</p>
                        <p>Future steps will include extrapolating categorical clusters, testing and comparing with algorithmic approaches, and mapping emergent patterns in 
                        associative thinking.</p>
                    </section>
                    <section>
                        <h3>How it works</h3>
                        <p>Use the menu bar to navigate and make your selections.</p>
                        <ul>
                            <li>
                                <h5>Select a mode:</h5>
                                <p>Choose <strong>Play</strong> to attempt to navigate from one page to another via the links found within each article. 
                                Choose <strong>Explore</strong> to see metrics and visualization of all attempts for a given option.</p>
                            </li>
                            <li>
                                <h5>Select an option:</h5>
                                <p>Choose from among a set of existing page combinations; or, add a new option.</p>
                            </li>
                        </ul>
                        <p>Within <strong>Play</strong> mode, you'll be presented with a Wikipedia page and a list of the links within it. Search or scroll to find a link
                        you think will lead you closer to the target article, and click the link to proceed to that page. Complete the challenge by clicking on the link to the target article, 
                        and you will be redirected to see how your attempt compares to others.</p>
                        <p>Within <strong>Explore</strong> mode, you'll see an interactive chart showing all entries for the given combination option. Hover over links and nodes in the chart 
                        to see corresponding article links. You may also hover over a list of all entries or your individual entries to highlight the data in the chart, or click on it to 
                        feature the data in the chart.</p>
                    </section>
                    <section>
                        <h3>Contribute</h3>
                        <p>Please share this site with others! The more participation, the richer the data set, and the more insights and analyses we will be able to draw in the future.</p>
                        <p>Also, you can check out the <a href="https://github.com/mpothier/wikinexus" target="_blank">code</a> available on GitHub.</p>
                    </section>
                </div>
            </div>
        )
    }
}

export default AboutModal