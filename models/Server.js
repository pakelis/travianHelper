const mongoose = require('mongoose')
const Schema = mongoos.Schema

//Create Schema
const ServersSchema = new Schema({
  servers: {name: []},
})

module.exports = Server = mongoose.model('servers', ServersSchema)
