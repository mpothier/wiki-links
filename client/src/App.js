import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import Navbar from './components/layout/Navbar'
import Home from './components/main/Home'
import OptionsModal from './components/modals/OptionsModal'
import Play from './components/main/Play'
import Explore from './components/main/Explore'
import { loadOptions } from './store/actions/optionListActions'

import './App.scss'

library.add(faArrowDown)


class App extends Component {
  state = {
    initialLoading: true,
    showModal: false
  }

  toggleOptionsModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
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
          <div>
            <Navbar toggleModal={this.toggleOptionsModal} />
            {this.state.showModal ? <OptionsModal closeModal={this.toggleOptionsModal} /> : null}
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} optionsModal={this.optionsModal} />} />
              <Route exact path='/play' component={Play} />
              <Route path='/play/:optionId' component={Play} />
              <Route exact path='/explore' component={Explore} />
              <Route exact path='/explore/:optionId' component={Explore} />
              <Route path='/explore/:optionId/:entryId' component={Explore} />
            </Switch>
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
