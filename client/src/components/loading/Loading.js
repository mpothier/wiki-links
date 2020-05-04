import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-screen">
            <Spinner animation="border" role="status" className="spinner">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading
