const express = require('express')
const router = express.Router()
const app = express()

//Server model
const Server = require('../../models/Server')

//@route GET /servers
//@desc Get all not started servers
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

        stringList.sort((a, b) => {
          a = a
            .toString()
            .split('-')
            .reverse()
            .join('')
          b = b
            .toString()
            .split('-')
            .reverse()
            .join('')
          return a > b ? 1 : a < b ? -1 : 0
        })
      }
      const sortedList = stringList.concat(servers)
      return res.json(sortedList)
    })
  // .then(servers => res.json(servers))
  // .catch(err => res.status(404).json({noserversfound: 'No servers found'}))
})

module.exports = router
