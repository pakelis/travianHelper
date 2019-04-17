import React from 'react'
import Gauls from '../img/gauls.png'
import Romans from '../img/romans.png'
import Teutons from '../img/teutons.png'

const FarmTable = props => {
  function calculateDistance(playerX, playerY) {
    let dist = Math.round(
      Math.sqrt(
        Math.pow(playerX - props.x, 2) + Math.pow(playerY - props.y, 2),
      ),
    )
    return dist
  }

  let playerCount = 1
  const players = props.players.map((player, index) =>
    calculateDistance(player.xCoord, player.yCoord) <= props.distance &&
    player.pop >= props.minPop &&
    player.pop <= props.maxPop ? (
      <tr key={index}>
        <th scope="row">{playerCount++}</th>
        <td>{calculateDistance(player.xCoord, player.yCoord)}</td>
        <td>{player.xCoord}</td>
        <td>{player.yCoord}</td>
        <td>{player.villageName}</td>
        <td>{player.accountName}</td>
        <td>{player.pop}</td>
        <td>{player.tribeId}</td>
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
                <th scope="col">Village name</th>
                <th scope="col">Account name</th>
                <th scope="col">Population</th>
                <th scope="col">Tribe</th>
              </tr>
            </thead>
            <tbody>{players}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default FarmTable
