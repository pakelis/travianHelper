import React, {Component} from 'react'
import logo from '../img/logo.png'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          <img
            src={logo}
            width="50"
            height="80"
            className="d-inline-block align top"
            alt="logo"
          />
        </a>
        <b>Travian </b>
        <br />
        Server List
      </nav>
    )
  }
}

export default Navbar
