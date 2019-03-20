const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ServersSchema = new Schema(
  {
    server: {
      name: {type: String, required: true},
      days: {type: String, required: true},
    },
  },
  {unique: true},
  {_id: false},
)

module.exports = Server = mongoose.model('servers', ServersSchema)
