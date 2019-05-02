import React, {Component} from 'react'
import Gauls from '../img/gauls.png'
import Romans from '../img/romans.png'
import Teutons from '../img/teutons.png'
import Natars from '../img/natars.png'

class FarmTable extends Component {
  state = {
    players: this.props.players,
    //check if server is travian
    travian: true,
  }

  updateTable() {
    let players = this.props.players
    //Add distance to players object
    players.forEach(
      player =>
        (player.distance = this.calculateDistance(
          player.xCoord,
          player.yCoord,
        )),
    )

    //Filter players
    players = players.filter(
      player =>
        parseFloat(this.props.minPop) <= parseFloat(player.population) &&
        parseFloat(player.population) <= parseFloat(this.props.maxPop),
    )

    //Sort by distance
    players.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))

    this.setState({
      players,
    })
  }

  checkIfTravian() {
    const {players} = this.props // destructing
    if (
      !isNaN(players[0].tribeId) &&
      players[0].tribeId <= 7 &&
      players[0].tribeId >= 1
    ) {
      console.log('TRAVIAN')
      this.setState({
        travian: true,
      })
    } else {
      console.log('NOT TRAVIAN')
      this.setState({
        travian: false,
      })
    }
  }

  componentDidMount() {
    this.checkIfTravian()
    //Update table
    this.updateTable()
  }

  // if user changes form inputs rerender
  componentDidUpdate(nextProps) {
    if (
      this.props.minPop !== nextProps.minPop ||
      this.props.maxPop !== nextProps.maxPop ||
      this.props.x !== nextProps.x ||
      this.props.y !== nextProps.y ||
      this.props.distance !== nextProps.distance
    ) {
      this.checkIfTravian()
      this.updateTable()
    }
  }

  calculateDistance(playerX, playerY) {
    let dist = Math.round(
      Math.sqrt(
        Math.pow(playerX - this.props.x, 2) +
          Math.pow(playerY - this.props.y, 2),
      ),
    )
    return dist
  }

  render() {
    let playerCount = 1
    const players = this.state.players.map((player, index) =>
      player.distance <= this.props.distance ? (
        <tr key={index}>
          <th scope="row">{playerCount++}</th>
          <td>{player.distance}</td>
          <td>{player.xCoord}</td>
          <td>{player.yCoord}</td>
          <td>{player.villageName}</td>
          <td>{player.accountName}</td>
          <td>
            {/* Add new tribes from sand and fire */}
            {player.tribeId === '5' ? (
              <img src={Natars} alt="Natars" width="30" height="30" />
            ) : player.tribeId === '3' ? (
              <img src={Gauls} alt="Gauls" width="30" height="30" />
            ) : player.tribeId === '2' ? (
              <img src={Romans} alt="Romans" width="30" height="30" />
            ) : player.tribeId === '1' ? (
              <img src={Teutons} alt="Teutons" width="30" height="30" />
            ) : null}
          </td>
          <td>{player.population}</td>
          <td>{player.allianceName}</td>
        </tr>
      ) : null,
    )

    const table = this.state.travian ? (
      <div className="container col-md-16">
        <div className="card mt-3">
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Distance</th>
                  <th scope="col">x coord</th>
                  <th scope="col">y coord</th>
                  <th scope="col">Village</th>
                  <th scope="col">Player</th>
                  <th scope="col">Tribe</th>
                  <th scope="col">Population</th>
                  <th scope="col">Alliance</th>
                </tr>
              </thead>
              <tbody>{players}</tbody>
            </table>
          </div>
        </div>
      </div>
    ) : (
      <div className="alert alert-warning">
        Make sure you entered right server name
      </div>
    )

    return <div>{table}</div>
  }
}

export default FarmTable
