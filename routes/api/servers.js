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
    .sort({'server.days': 1})
    .then(servers => {
      let stringList = []
      for (const item of servers) {
        if (isNaN(item.server.days)) {
          stringList.push(item)
        }
      }
      const sortedList = stringList.concat(servers)
      let string = '02 Apr 2019'
      let d = new Date(string)
      return res.json(`${d.getFullYear()}/0${d.getMonth() + 1}/0${d.getDay()}`)
      // return res.json(sortedList)
    })
  // .then(servers => res.json(servers))
  // .catch(err => res.status(404).json({noserversfound: 'No servers found'}))
})

module.exports = router
