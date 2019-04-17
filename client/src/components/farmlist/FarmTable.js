import React from 'react'
import Gauls from '../img/gauls.png'
import Romans from '../img/romans.png'
import Teutons from '../img/teutons.png'
import Natars from '../img/natars.png'

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
                <th scope="col">Population</th>
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

export default FarmTable
