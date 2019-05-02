import React, {Component} from 'react'
import Chart from './Chart'

class ChartList extends Component {
  state = {
    data: this.props.data,
    rightName: true,
  }

  componentDidMount() {
    this.checkIfTravian()
  }

  componentDidUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.checkIfTravian()
    }
  }

  checkIfTravian() {
    const {data} = this.props // destructing
    if (
      !isNaN(data[0].tribeId) &&
      data[0].tribeId <= 7 &&
      data[0].tribeId >= 1
    ) {
      console.log('TRAVIAN')
      this.setState({
        rightName: true,
      })
    } else {
      console.log('NOT TRAVIAN')
      this.setState({
        rightName: false,
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.rightName ? (
          <div>
            <Chart data={this.state.data} />
          </div>
        ) : (
          <div className="alert alert-danger">Please check server name</div>
        )}
      </div>
    )
  }
}

export default ChartList
