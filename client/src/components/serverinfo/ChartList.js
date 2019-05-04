import React, {Component} from 'react'
import BarDiagram from './diagrams/BarDiagram'
import PieDiagram from './diagrams/PieDiagram'

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
    villagePop: {
      tjillfifty: null,
      fiftytohundred: null,
      hundredtothree: null,
      threetofive: null,
      fiveto1k: null,
      kplus: null,
    },
  }

  componentWillMount() {
    this.checkIfTravian()
    this.getTribes()
    this.getPop()
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

  getPop() {
    const {data} = this.props
    let fifty = 0
    let hundred = 0
    let hundred3 = 0
    let hundred5 = 0
    let hundred10 = 0
    let kplus = 0

    data.forEach(val => {
      if (val.population <= 50) {
        fifty += 1
      } else if (50 <= val.population && val.population <= 100) {
        hundred += 1
      } else if (100 <= val.population && val.population <= 300) {
        hundred3 += 1
      } else if (300 <= val.population && val.population <= 500) {
        hundred3 += 1
      } else if (500 <= val.population && val.population <= 1000) {
        hundred10 += 1
      } else if (val.population > 1000) {
        kplus += 1
      }
    })

    this.setState({
      villagePop: {
        ...this.state.villagePop,
        tillfifty: fifty,
        fiftytohundred: hundred,
        hundredtothree: hundred3,
        threetofive: hundred5,
        fiveto1k: hundred10,
        kplus: kplus,
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
              <PieDiagram
                gauls={gauls}
                romans={romans}
                natars={natars}
                teutons={teutons}
              />
            </div>
            <div>
              <BarDiagram
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
