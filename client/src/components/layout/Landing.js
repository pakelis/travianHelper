import React, {Component} from 'react'
import CountryList from '../serverlist/CountryList'
import ReactCountryFlag from 'react-country-flag'
import axios from 'axios'

class Landing extends Component {
  state = {
    servers: [],
  }

  componentDidMount() {
    axios
      .get('/servers')
      .then(res => this.setState({servers: res.data}))
      .catch(err => console.log(err))
  }

  render() {
    let numRows = 1
    const server = this.state.servers.map(server => (
      <tr key={server._id}>
        <th scope="row">{numRows++}</th>
        <td>
          <ReactCountryFlag
            styleProps={{
              width: '20px',
              height: '20px',
            }}
            code={
              server.server.name.includes('lt') === true
                ? 'lt'
                : server.server.name.includes('angl') === true
                ? 'gb'
                : server.server.name.includes('ae') === true
                ? 'ae'
                : server.server.name.includes('balk') === true
                ? 'si'
                : server.server.name.includes('chin') === true
                ? 'cn'
                : server.server.name.includes('czsk') === true
                ? 'cz'
                : server.server.name.includes('hisp') === true
                ? 'es'
                : server.server.name.includes('bras') === true
                ? 'pt'
                : server.server.name.includes('nord')
                ? 'no'
                : server.server.name.includes('arab')
                ? 'ae'
                : server.server.name.includes('asia')
                ? 'th'
                : server.server.name.slice(-2) === 'om'
                ? 'us'
                : server.server.name.slice(-2)
            }
            svg
          />
          {` ${server.server.name}`}
        </td>
        <td>{server.server.days}</td>
        <td>
          <button type="button" className="btn btn-outline-dark">
            <a
              href={`https://${server.server.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              register
            </a>
          </button>
        </td>
      </tr>
    ))

    return (
      <div className="container">
        <CountryList />
        <div className="card mt-5">
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Server</th>
                  <th scope="col">Days Left</th>
                  <th scope="col">Register</th>
                </tr>
              </thead>
              <tbody>{server}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default Landing
