import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Home.scss'

const Home = () => {
    return (
        <div className="home-content">
            <div className="container-wrapper">
                <div className="container">
                    <div id="carousel-home" className="carousel" data-ride="carousel" data-interval='false'>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="slide-content">
                                    <h1 className="display-4 text-center">Welcome to WikiLinks</h1>
                                    <p className="lead text-center">
                                        WikiLinks is an open-source project that aims to explore cognitive and cultural associations within our shared world of knowledge. 
                                        We aim to find and map patterns emergent in the way humans draw connections across concepts.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="slide-content">
                                    <h3>Engage and Explore Data</h3>
                                    <p className="lead">
                                        Use the menu in the upper-left corner to guide your experience.<br/>Select a mode and an option (pair of topics) to begin.
                                        <br/><br/>
                                        In <strong>Play</strong> mode, navigate from a given topic to a target topic using the link buttons provided.<br/>See how many different ways 
                                        you can connect the two.
                                        <br/><br/>
                                        In <strong>Explore</strong> mode, view and interact with data sourced and aggregated from all visitors.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="slide-content">
                                    <h3>Share and Contribute</h3>
                                    <p className="lead">
                                        More data = better analysis. Attempt each option once or more, and share this site with others!
                                        <br/><br/>
                                        We plan to add new features as we go. Check back in every now and again to see what's new.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-home" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-home" data-slide-to="1"></li>
                            <li data-target="#carousel-home" data-slide-to="2"></li>
                        </ol>
                        <a className="carousel-control-prev" href="#carousel-home" role="button" data-slide="prev">
                            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
                        </a>
                        <a className="carousel-control-next" href="#carousel-home" role="button" data-slide="next">
                            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
