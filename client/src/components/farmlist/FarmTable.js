import React, {Component} from 'react'
import Gauls from '../img/gauls.png'
import Romans from '../img/romans.png'
import Teutons from '../img/teutons.png'
import Natars from '../img/natars.png'

class FarmTable extends Component {
  state = {
    players: this.props.players,
  }

  //STILL DOESNT WORK SORTING NEED TO FIX IT
  onSort(event, sortKey) {
    const players = this.state.players
    players.sort((a, b) => a[sortKey] < b[sortKey])
    this.setState({players: players})
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

  //doesnt work in between if i write min pop 5 or 3 only with 0 or 10 ?!?!?!?!?!?
  between(min, max, between) {
    if (min <= between && between <= max) return true
  }

  render() {
    let playerCount = 1
    const players = this.state.players.map((player, index) =>
      this.calculateDistance(player.xCoord, player.yCoord) <=
        this.props.distance &&
      this.between(this.props.minPop, this.props.maxPop, player.pop) ===
        true ? (
        <tr key={index}>
          <th scope="row">{playerCount++}</th>
          <td>{this.calculateDistance(player.xCoord, player.yCoord)}</td>
          <td>{player.xCoord}</td>
          <td>{player.yCoord}</td>
          <td>{player.villageName}</td>
          <td>{player.accountName}</td>
          <td>
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
          <td>{player.pop}</td>
          <td>{player.allianceName}</td>
        </tr>
      ) : null,
    )

    return (
      <div className="container col-md-16">
        <div className="card mt-5">
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
                  <th scope="col">
                    <button onClick={e => this.onSort(e, 'pop')}>
                      Population
                    </button>
                  </th>
                  <th scope="col">Alliance</th>
                </tr>
              </thead>
              <tbody>{players}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default FarmTable
