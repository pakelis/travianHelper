import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
import ReactCountryFlag from 'react-country-flag'
import CountryList from './CountryList'

class FlagList extends Component {
  state = {
    servers: [],
    loading: false,
  }

  enableSpinner() {
    this.setState({
      loading: true,
    })
  }

  componentDidMount() {
    this.enableSpinner()
    axios
      .get(`/servers/${this.props.match.params.id}`)
      .then(res =>
        this.setState({
          servers: res.data,
          loading: false,
        }),
      )
      .catch(err => console.log(err))
  }

  componentDidUpdate(prevprops) {
    //check if props changed if so get axios request to change state to rerender component!
    //TODO make axios request a function so it wont duplicate
    if (this.props.match.params.id !== prevprops.match.params.id) {
      this.enableSpinner()
      axios
        .get(`/servers/${this.props.match.params.id}`)
        .then(res =>
          this.setState({
            servers: res.data,
            loading: false,
          }),
        )
        .catch(err => console.log(err))
    }
  }

  render() {
    let numRows = 1
    const server = this.state.servers.map((server, index) => (
      <tr key={index}>
        <th scope="row">{numRows++}</th>
        <td>
          <ReactCountryFlag
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
        <td>
          {typeof server.server.days === 'string' ? (
            <h5>
              <span className="badge badge-pill badge-success">
                {server.server.days}
              </span>
            </h5>
          ) : (
            <h5>
              <span className="badge badge-pill badge-warning">
                {server.server.days} days ago
              </span>
            </h5>
          )}
        </td>
        <td>
          <button type="button" className="btn btn-outline-light">
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
      <div className="container mt-5">
        <CountryList />
        {this.state.loading ? (
          <div className="text-center mt-5">
            <ClipLoader loading={this.state.loading} size={125} />
          </div>
        ) : (
          <div className="card mt-5 p-0">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Server</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Register</th>
                </tr>
              </thead>
              <tbody>{server}</tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
export default FlagList
