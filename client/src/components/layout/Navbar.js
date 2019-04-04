import React, {Component} from 'react'
import logo from '../img/image.png'

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <a href="/" className="navbar-brand">
          <img src={logo} alt="Logo" width="100" height="100" />
          TRAVIAN SERVER LIST
        </a>
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
              <a href="/" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Servers
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                Farm List
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
