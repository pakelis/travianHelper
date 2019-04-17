import React, {Component} from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import FarmList from './components/farmlist/FarmList'
import FlagList from './components/serverlist/FlagList'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import ServerInfo from './components/serverinfo/ServerInfo'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/farmlist" component={FarmList} />
            <Route exact path="/servinfo" component={ServerInfo} />
            <Route
              path="/servers/:id"
              render={props => (
                <div>
                  <FlagList {...props} />
                </div>
              )}
            />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
