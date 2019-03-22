const express = require('express')
const async = require('async')
const scraper = require('./scrape')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 5000

//Get scripts
const initialLoad = require('./bot')

//DB config
const db = require('./config/keys').mongoURI

//Connect to mongoDB through mongoose
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const servers = require('./routes/api/servers')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Load server module
const Server = require('./models/Server')

//Initial load && Updating data
async function loadData() {
  await initialLoad()
}
async function updateData() {
  const servers = await scraper()
  // change current server days with new scraped days

  //HAVE TO FIX IT NOT UPDATING
  /* async.eachSeries(servers, (server, done) => {
    console.log(server)
    Server.update({name: server.name}, server, done)
  }),
    function allDone(err) {
      console.log(err)
    } */
}

//If servers is empty we want to load all data
let numServers = Server.countDocuments({}).then(count => {
  if (count === 0 || null || undefined) {
    loadData().then(console.log('Loading data...'))
  } else {
    const min = 60
    const hour = min * 60 * 100
    //if servers is not empty we want to update that data
    console.log('Updating data...')
    //Update servers once an hour (setInterval)
    updateData()
  }
})

//Use Routes
app.use('/', servers)

app.get('/', (request, response) => {
  response.json('PORT 5000')
})

app.listen(port, err => {
  if (err) {
    console.log(err)
  }
  console.log(`listening on port + ${port}`)
})
