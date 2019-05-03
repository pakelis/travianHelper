import React, {Component} from 'react'
import Chart from './Chart'
import Chart2 from './Chart2'

class ChartList extends Component {
  state = {
    data: this.props.data,
    rightName: true,
    tribes: {
      teutons: null,
      romans: null,
      gauls: null,
      natars: null,
    },
  }

  componentWillMount() {
    this.checkIfTravian()
    this.getTribes()
  }

  componentDidUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.checkIfTravian()
      this.getTribes()
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

  //Parsing data - teutons, romans, gauls , natars
  getTribes() {
    const {data} = this.props
    let teutons = 0
    let romans = 0
    let gauls = 0
    let natars = 0

    data.forEach(val => {
      if (val.tribeId === '1') {
        teutons += 1
      } else if (val.tribeId === '2') {
        romans += 1
      } else if (val.tribeId === '3') {
        gauls += 1
      } else if (val.tribeId === '5') {
        natars += 1
      }
    })

    this.setState({
      tribes: {
        ...this.state.tribes,
        teutons: teutons,
        romans: romans,
        gauls: gauls,
        natars: natars,
      },
    })
  }

  render() {
    const {gauls, romans, natars, teutons} = this.state.tribes
    return (
      <div>
        {this.state.rightName ? (
          <div>
            <div>
              <Chart2
                gauls={gauls}
                romans={romans}
                natars={natars}
                teutons={teutons}
              />
            </div>
            <div>
              <Chart
                gauls={gauls}
                romans={romans}
                natars={natars}
                teutons={teutons}
              />
            </div>
          </div>
        ) : (
          <div className="alert alert-danger">Please check server name</div>
        )}
      </div>
    )
  }
}

export default ChartList
