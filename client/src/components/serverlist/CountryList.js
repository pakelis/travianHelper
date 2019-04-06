import React, {Component} from 'react'
import ReactCountryFlag from 'react-country-flag'
import {Link} from 'react-router-dom'

class CountryList extends Component {
  state = {
    flagList: [
      'ae',
      'gb',
      'ae',
      'si',
      'lt',
      'cn',
      'us',
      'cz',
      'de',
      'eg',
      'fr',
      'es',
      'hu',
      'id',
      'il',
      'ir',
      'it',
      'jp',
      'pt',
      'my',
      'nl',
      'no',
      'pl',
      'ro',
      'ru',
      'sa',
      'th',
      'tr',
      'vn',
    ],
  }

  render() {
    const flaglist = this.state.flagList.map(flag => (
      <button className="btn btn-light">
        <Link to={`servers/${flag}`}>
          <ReactCountryFlag code={flag} svg />
          {` ${flag}`}
        </Link>
      </button>
    ))

    return (
      <div className="row justify-content-center">
        <div className="col md-12">{flaglist}</div>
      </div>
    )
  }
}
export default CountryList
