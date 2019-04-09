import React, {Component} from 'react'
import axios from 'axios'

class FarmList extends Component {
  onSubmitClick = () => {
    axios
      .get('/farmlist/:id')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
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
                  />
                  <div className="form-group col-12 col-md-6 mt-3">
                    <label className="control-label ml-1">X coordinates</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="X"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6 mt-3">
                    <label className="control-label ml-1">Y coordinates</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Y"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Min population</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Min"
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <label className="control-label ml-1">Max population</label>
                    <input
                      type="text"
                      className="form-control form-rounded"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  onClick={this.onSubmitClick}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default FarmList
