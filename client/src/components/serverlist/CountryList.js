import React, {Component} from 'react'
import ReactCountryFlag from 'react-country-flag'
import {Link} from 'react-router-dom'

class CountryList extends Component {
  state = {
    flagList: [
      {flag: 'ae', name: 'ae'},
      {flag: 'gb', name: 'angl'},
      {flag: 'ae', name: 'arab'},
      {flag: 'si', name: 'balk'},
      {flag: 'lt', name: 'lt'},
      {flag: 'cn', name: 'chin'},
      //TODO change travian.com to length string,cus its showing arab.travian.com also
      {flag: 'us', name: 'travian.com'},
      {flag: 'cz', name: 'cz'},
      {flag: 'de', name: 'de'},
      {flag: 'eg', name: 'eg'},
      {flag: 'fr', name: 'fr'},
      {flag: 'es', name: 'hisp'},
      {flag: 'hu', name: 'hu'},
      {flag: 'id', name: 'id'},
      {flag: 'il', name: 'co.il'},
      {flag: 'ir', name: 'travian.ir'},
      {flag: 'it', name: 'it'},
      {flag: 'jp', name: 'jp'},
      {flag: 'pt', name: 'bras'},
      {flag: 'my', name: 'my'},
      {flag: 'nl', name: 'nl'},
      {flag: 'no', name: 'nord'},
      {flag: 'pl', name: 'pl'},
      {flag: 'ro', name: 'travian.ro'},
      {flag: 'ru', name: 'ru'},
      {flag: 'sa', name: 'sa'},
      {flag: 'th', name: 'asia'},
      {flag: 'tr', name: 'com.tr'},
      {flag: 'vn', name: 'vn'},
    ],
  }

  render() {
    //TODO fix country names , some of them duplicates
    const flaglist = this.state.flagList.map((flag, index) => (
      <Link to={`/servers/${flag.name}`} key={index}>
        <button className="btn btn-light">
          <ReactCountryFlag code={flag.flag} svg />
          {` ${flag.flag}`}
        </button>
      </Link>
    ))

    return (
      <div className="card bg-light">
        <div className="row justify-content-center">
          <div className="col md-12">
            {flaglist}
            <Link to={`/`}>
              <button className="btn btn-light">
                <ReactCountryFlag code="eu" svg /> all
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default CountryList
