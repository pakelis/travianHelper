const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Getting error so using this
mongoose.set('useCreateIndex', true)

//Create Schema
const ServersSchema = new Schema({
  server: {
    name: {type: String, required: true, unique: true},
    days: {type: String, required: true},
  },
})

module.exports = Server = mongoose.model('servers', ServersSchema)
