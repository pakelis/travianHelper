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
      const sortedList = stringList.concat(servers)
      return res.json(sortedList)
    })
    .catch(err => res.status(404).json({noserversfound: 'No servers found'}))
})

router.get('/servers/:id', (req, res) => {
  res.json(`${req.url}`)
})

module.exports = router
