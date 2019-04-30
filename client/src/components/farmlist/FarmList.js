import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
import FarmTable from './FarmTable'

const urlRegex = RegExp(
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
)
const coordRegex = RegExp(/^[0-9 ()+-]+$/)

const formValid = ({formErrors, ...rest}) => {
  let valid = true

  //if val.length greater then 0 put valid to false, cus there is an error then.
  Object.values(formErrors).forEach(val => val.length > 0 && (valid = false))

  //validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  })

  return valid
}

class FarmList extends Component {
  state = {
    loading: false,
    alert: false,
    players: [],
    unpublished: {
      serverName: null,
      x: null,
      y: null,
      minPop: null,
      maxPop: null,
      distance: null,
    },
    published: {
      serverName: '',
      x: '',
      y: '',
      minPop: '',
      maxPop: '',
      distance: '',
    },
    formErrors: {
      serverName: '',
      x: '',
      y: '',
      minPop: '',
      maxPop: '',
      distance: '',
    },
    displayList: 0,
  }

  displayList = e => {
    if (formValid(this.state)) {
      this.enableSpinner()
      axios
        .get(`/farmlist/${this.state.unpublished.serverName}`)
        .then(res => {
          this.setState({
            loading: false,
            players: res.data,
            displayList: 1,
            // spreading state makes error
            // ...this.state,
            published: {...this.state.published, ...this.state.unpublished},
            alert: false,
          })
        })
        .catch(err => console.log(err))
    } else {
      this.setState({
        alert: true,
      })
    }
  }

  onInputChange = e => {
    const {name, value} = e.target
    let formErrors = {...this.state.formErrors}

    switch (name) {
      case 'serverName':
        formErrors.serverName = urlRegex.test(value) ? '' : 'wrong server name'
        break
      case 'x':
        formErrors.x = coordRegex.test(value)
          ? ''
          : 'cannot contain that symbol'
        break
      case 'y':
        formErrors.y = coordRegex.test(value)
          ? ''
          : 'cannot contain that symbol'
        break
      case 'minPop':
        formErrors.minPop = coordRegex.test(value)
          ? ''
          : 'cannot contain that symbol'
        break
      case 'maxPop':
        formErrors.maxPop = coordRegex.test(value)
          ? ''
          : 'cannot contain that symbol'
        break
      case 'distance':
        formErrors.distance = coordRegex.test(value)
          ? ''
          : 'cannot contain that symbol'
        break
      default:
        break
    }

    this.setState(
      {
        // spreading unpublished state so i could use [e.target.name] : e.target.value
        formErrors,
        unpublished: {
          ...this.state.unpublished,
          [e.target.name]: e.target.value,
        },
      },
      () => console.log(this.state),
    )
  }

  enableSpinner() {
    this.setState({
      loading: true,
    })
  }

  enableButton() {
    this.setState({
      disabledButton: false,
    })
  }

  render() {
    const {formErrors} = this.state

    let list = null

    if (this.state.displayList === 1 && this.state.loading === false) {
      list = (
        <div>
          <FarmTable
            x={this.state.published.x}
            y={this.state.published.y}
            minPop={this.state.published.minPop}
            maxPop={this.state.published.maxPop}
            players={this.state.players}
            distance={this.state.published.distance}
          />
        </div>
      )
    }

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 p-4">
            <div className="card">
              <div className="card-header text-center">Farm Finder</div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-12 col-md-12">
                    <label className="control-label ml-1">Server name</label>
                    <input
                      type="text"
                      className={
                        formErrors.serverName.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.serverName === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder="Server Name e.g. ts2.travian.com"
                      name="serverName"
                      onChange={this.onInputChange}
                    />
                    {formErrors.serverName.length > 0 && (
                      <div className="invalid-feedback">
                        {formErrors.serverName}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6 ">
                    <label className="control-label ml-1">X coordinates</label>
                    <input
                      type="text"
                      className={
                        formErrors.x.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.x === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder="X"
                      name="x"
                      onChange={this.onInputChange}
                    />
                    {formErrors.x.length > 0 && (
                      <div className="invalid-feedback">{formErrors.x}</div>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6 ">
                    <label className="control-label ml-1">Y coordinates</label>
                    <input
                      type="text"
                      className={
                        formErrors.y.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.y === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder="Y"
                      name="y"
                      onChange={this.onInputChange}
                    />
                    {formErrors.y.length > 0 && (
                      <div className="invalid-feedback">{formErrors.y}</div>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Min population</label>
                    <input
                      type="text"
                      className={
                        formErrors.minPop.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.minPop === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder="Min"
                      name="minPop"
                      onChange={this.onInputChange}
                    />
                    {formErrors.minPop.length > 0 && (
                      <div className="invalid-feedback">
                        {formErrors.minPop}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Max population</label>
                    <input
                      type="text"
                      className={
                        formErrors.maxPop.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.maxPop === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder="Max"
                      name="maxPop"
                      onChange={this.onInputChange}
                    />
                    {formErrors.maxPop.length > 0 && (
                      <div className="invalid-feedback">
                        {formErrors.maxPop}
                      </div>
                    )}
                  </div>
                  <div className="form-group col-12 col-md-12 ">
                    <label className="control-label ml-1">Distance</label>
                    <input
                      type="text"
                      className={
                        formErrors.distance.length > 0
                          ? `form-control form-rounded is-invalid`
                          : this.state.unpublished.distance === null
                          ? `form-control form-rounded`
                          : `form-control form-rounded is-valid`
                      }
                      placeholder=""
                      name="distance"
                      onChange={this.onInputChange}
                    />
                    {formErrors.distance.length > 0 && (
                      <div className="invalid-feedback">
                        {formErrors.distance}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={this.displayList}
                >
                  Search
                </button>
              </div>
            </div>
            {this.state.alert ? (
              <div className="alert alert-danger mt-3">
                All fields must be correct!
              </div>
            ) : null}
            <div className="text-center mt-4">
              <ClipLoader loading={this.state.loading} size={125} />
            </div>
          </div>
        </div>
        {list}
      </div>
    )
  }
}
export default FarmList
