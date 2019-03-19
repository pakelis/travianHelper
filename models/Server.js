const mongoose = require('mongoose')
const Schema = mongoos.Schema

//Create Schema
const ServersSchema = new Schema({
  server: {
    name: String,
    days: String,
  },
})

module.exports = Server = mongoose.model('servers', ServersSchema)
