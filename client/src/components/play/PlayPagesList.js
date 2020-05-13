import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './PlayPagesList.scss'

const PlayPagesList = ({ pageList }) => {
    const pagesList = pageList.map(page => {
        return (
          <div key={page.order}>
            {(pageList.indexOf(page) !== 0) ? <div className="down-arrow"><FontAwesomeIcon icon="arrow-down" /></div> : null}
            <li className="list-group-item text-truncate">{page.title}</li>
          </div>
        )
      })
    return (
        <div className="page-list-panel">
            <div className="running-total">{pagesList.length || null}</div>
            <div className="page-list">
                <ul className="list-group">
                    {pagesList}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        pageList: state.play.pageList
    }
}

export default connect(mapStateToProps)(PlayPagesList)
