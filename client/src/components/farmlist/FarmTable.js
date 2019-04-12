import React from 'react'

const FarmTable = props => {
  let playerCount = 1
  const players = props.players.map((player, index) => (
    <tr key={index}>
      <th scope="row">{playerCount++}</th>
      <td>{player.xCoord}</td>
      <td>{player.yCoord}</td>
      <td>{player.villageName}</td>
      <td>{player.accountName}</td>
      <td>{player.pop}</td>
      <td>{player.tribeId}</td>
    </tr>
  ))

  return (
    <div className="container col-md-16">
      <div className="card mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
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
