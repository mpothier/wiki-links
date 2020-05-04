import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

import Navbar from './components/layout/Navbar'
import Home from './components/main/Home'
import OptionsModal from './components/modals/OptionsModal'
import Play from './components/main/Play'
import Explore from './components/main/Explore'

import './App.scss'

library.add(faArrowDown)


class App extends Component {
  state = {
    showModal: false
  }

  toggleOptionsModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  } 

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
}

export default App;
