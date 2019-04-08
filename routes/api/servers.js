const express = require('express')
const router = express.Router()
const app = express()

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

module.exports = router
