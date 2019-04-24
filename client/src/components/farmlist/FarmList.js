import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'
import axios from 'axios'
import FarmTable from './FarmTable'

class FarmList extends Component {
  state = {
    loading: false,
    players: [],
    unpublished: {
      serverName: '',
      x: '',
      y: '',
      minPop: '',
      maxPop: '',
      distance: '',
    },
    published: {
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
        })
      })
      .catch(err => console.log(err))
  }

  onInputChange = e => {
    this.setState({
      // spreading unpublished state so i could use [e.target.name] : e.target.value
      unpublished: {
        ...this.state.unpublished,
        [e.target.name]: e.target.value,
      },
    })
  }

  enableSpinner() {
    this.setState({
      loading: true,
    })
  }

  render() {
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
                  <label className="control-label ml-1">Server name</label>
                  <input
                    type="text"
                    className="form-control form-rounded"
                    placeholder="ts2.travian.com"
                    name="serverName"
                    onChange={this.onInputChange}
                  />
                  <div className="form-group col-12 col-md-6 mt-3">
                    <label className="control-label ml-1">X coordinates</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="X"
                      name="x"
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6 mt-3">
                    <label className="control-label ml-1">Y coordinates</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Y"
                      name="y"
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Min population</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Min"
                      name="minPop"
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Max population</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Max"
                      name="maxPop"
                      onChange={this.onInputChange}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6 ">
                    <label className="control-label ml-1">Distance</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder=""
                      name="distance"
                      onChange={this.onInputChange}
                    />
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
