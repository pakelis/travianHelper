const express = require('express')
const router = express.Router()
const app = express()
const fetch = require('node-fetch')

//Server model
const Server = require('../../models/Server')

//@route GET /servers
//@desc Get all servers, sorted by date
//@access Public

router.get('/servers', (req, res) => {
  let servers = Server.find()
    //sort by server days
    .sort({'server.days': 1})
    .then(servers => {
      let stringList = []
      for (const item of servers) {
        //Check if item is Not an number
        if (isNaN(item.server.days)) {
          //get date from string
          date = new Date(item.server.days)
          year = date.getFullYear()
          month =
            date.getMonth() + 1 > 9
              ? date.getMonth() + 1
              : `0${date.getMonth() + 1}`
          day = `${date.getDate()}` > 9 ? date.getDate() : `0${date.getDate()}`
          item.server.days = `${year}-${month}-${day}`
          stringList.push(item)
        }

        //Sort string list by date
        stringList.sort((a, b) => {
          a.server.days = a.server.days
            .split('/')
            .reverse()
            .join('')
          b.server.days = b.server.days
            .split('/')
            .reverse()
            .join('')
          return a.server.days.localeCompare(b.server.days)
        })
        //reverse it so it looks by date
        stringList.reverse()
      }
      let sortedList = stringList.concat(servers)
      //delete dates from array end
      for (let i = 0; i < stringList.length; i++) {
        sortedList.pop()
      }
      return res.json(sortedList)
    })
    .catch(err => res.status(404).json({noserversfound: 'No servers found'}))
})

//@route GET /servers/:id
//@desc Get servers by country
//@access Public

router.get('/servers/:id', (req, res) => {
  // res.json(`${req.params.id}`)
  Server.find()
    .sort({'server.days': 1})
    .then(servers => {
      let country = []
      for (const item of servers) {
        if (
          req.params.id === 'travian.com' &&
          item.server.name.endsWith('travian.com') &&
          item.server.name.length <= 18
        ) {
          country.push(item)
        } else if (
          req.params.id !== 'travian.com' &&
          item.server.name.includes(req.params.id)
        ) {
          country.push(item)
        } else if (
          req.params.id === 'speed' &&
          item.server.name.startsWith('tx')
        ) {
          country.push(item)
        }
      }
      //if array is empty throw status 404
      if (country.length < 1 || undefined) {
        res.status(404).json("Can't find servers with that name")
      } else {
        res.json(country)
      }
    })
})

//@route GET /farmlist/:id
//@desc Get farmlist by id
//@access Public

router.get('/farmlist/:id', (req, res) => {
  let myInit = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  }

  fetch(`http://${req.params.id}/map.sql`, myInit)
    .then(fetchRes => fetchRes.text()) // fetch resolves Response object,not the actual content of response so we use text()
    .then(data => {
      // no need res.json
      //splitting text by ;
      let players = data.split(';')
      let parsedPlayers = []
      for (let player of players) {
        // getting the middle of braces (middle)
        player = player.substring(
          player.lastIndexOf('(') + 1,
          player.lastIndexOf(')'),
        )
        //split player string by comma
        userString = player.split(',')
        //Making Names string objects
        let villageName = new String(userString[5])
        let accountName = new String(userString[7])
        villageName = villageName.slice(0, -1)
        villageName = villageName.slice(1, villageName.length)
        accountName = accountName.slice(0, -1)
        accountName = accountName.slice(1, accountName.length)
        let user = {
          fieldId: userString[0],
          xCoord: userString[1],
          yCoord: userString[2],
          tribeId: userString[3],
          villageId: userString[4],
          villageName: villageName,
          userId: userString[6],
          accountName: accountName,
          allianceId: userString[8],
          allianceName: userString[9],
          pop: userString[10],
        }
        parsedPlayers.push(user)
      }
      res.send(parsedPlayers)
    })
    .catch(err => console.log(err))
})

module.exports = router
