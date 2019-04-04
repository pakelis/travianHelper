import React, {Component} from 'react'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Footer from './components/layout/Footer'
import FarmList from './components/farmlist/FarmList'
import Contact from './components/contact/Contact'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/farmlist" component={FarmList} />
            <Route exact path="/contact" component={Contact} />
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
