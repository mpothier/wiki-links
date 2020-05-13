import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown, faBars, faTimes, faArrowRight, faPlus, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

import Navbar from './components/layout/Navbar'
import Home from './components/main/Home'
import Play from './components/main/Play'
import Explore from './components/main/Explore'
import { loadOptions } from './store/actions/optionListActions'

import './App.scss'

library.add(faArrowDown, faBars, faTimes, faQuestionCircle, faArrowRight, faPlus, faChevronRight, faChevronLeft)


class App extends Component {
  state = {
    initialLoading: true
  }

  componentDidMount() {
    // Load all options from server/database
    this.props.loadOptions()
      .then(() => {
        this.setState({
          initialLoading: false
        })
      })
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.initialLoading ? (
          null
        ) : (
          <div id="app">
            <Navbar />
            <div id="content">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/play' component={Play} />
                <Route path='/play/:optionId' component={Play} />
                <Route exact path='/explore' component={Explore} />
                <Route exact path='/explore/:optionId' component={Explore} />
                <Route path='/explore/:optionId/:entryId' component={Explore} />
              </Switch>
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: () => dispatch(loadOptions())
  }
}

export default connect(null, mapDispatchToProps)(App);
