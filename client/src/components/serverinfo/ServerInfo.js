import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
import ChartList from './ChartList'

const urlRegex = RegExp(
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
)

const formValid = ({formErrors, ...rest}) => {
  let valid = true

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false)
  })

  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  })

  return valid
}

class ServerInfo extends Component {
  state = {
    serverName: null,
    loading: false,
    serverData: [],
    displayInfo: false,
    formErrors: {
      serverName: '',
    },
  }

  onInputChange = e => {
    const {name, value} = e.target

    let formErrors = {...this.state.formErrors}

    switch (name) {
      case 'serverName':
        formErrors.serverName = urlRegex.test(value) ? '' : 'wrong server name'
        break
      default:
        break
    }

    this.setState({
      formErrors,
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (formValid(this.state)) {
      this.enableSpinner()
      axios
        .get(`/farmlist/${this.state.serverName}`)
        .then(res => {
          this.setState({
            serverData: res.data,
            displayInfo: true,
            loading: false,
          })
        })
        .catch(err => console.log(err))
    } else {
      console.log('SOMETHING WENT WRONG')
    }
  }

  enableSpinner() {
    this.setState({
      loading: true,
    })
  }

  render() {
    const {formErrors, serverName} = this.state

    let info = null

    if (this.state.displayInfo === true) {
      info = (
        <div>
          <ChartList data={this.state.serverData} />
        </div>
      )
    }

    return (
      <div id="subscription_area">
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12">
              <div className="subscribe_now">
                <form className="subscribe_form">
                  <div className="input-group">
                    <input
                      type="text"
                      className={
                        formErrors.serverName.length > 0
                          ? `form-control is-invalid`
                          : serverName === null
                          ? `form-control`
                          : `form-control is-valid`
                      }
                      name="serverName"
                      placeholder="Server name e.g. ts2.travian.com"
                      onChange={this.onInputChange}
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-default"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Get info
                      </button>
                    </span>
                    {formErrors.serverName.length > 0 && (
                      <div className="invalid-feedback">
                        {formErrors.serverName}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="text-center mt-4">
                <ClipLoader
                  color={'#640b0a'}
                  loading={this.state.loading}
                  size={125}
                />
              </div>
              {info}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerInfo
