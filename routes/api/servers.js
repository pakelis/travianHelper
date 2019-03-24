const express = require('express')
const router = express.Router()
const app = express()

//Server model
const Server = require('../../models/Server')

//@route GET /servers
//@desc Get all not started servers
//@access Public

router.get('/servers', (req, res) => {
  Server.find()
    .sort({'server.days': -1})
    .then(servers => res.json(servers))
    .catch(err => res.status(404).json({noserversfound: 'No servers found'}))
})

module.exports = router
