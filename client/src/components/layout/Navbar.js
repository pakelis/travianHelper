import React, {Component} from 'react'
import logo from '../img/icon.png'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="d-none d-lg-block">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" width="100" height="100" />
            TRAVIAN SERVER LIST
          </Link>
        </div>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="nav navbar-nav flex-fill justify-content-end">
            <li className="nav-item">
              <Link to="/farmlist" className="nav-link">
                Farm List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Servers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/servinfo" className="nav-link">
                Server Info
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
