import React, {Component} from 'react'
import axios from 'axios'

class Landing extends Component {
  componentDidMount() {
    axios
      .get('/servers')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>LANDING</h1>
      </div>
    )
  }
}
export default Landing
