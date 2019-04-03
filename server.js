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
  //TODO error after few times of updating!
  const servers = await scraper()
  // change current server days with new scraped days

  //using async npm , to update one at the time with eachSeries
  async.eachSeries(servers, (server, done) => {
    //TODO CHECK IF THERE IS NEW SERVERS IF SO ADD THEM TO DATABASE, BCUZ NOW WE UPDATE ONLY SERVERS THAT ALREADY ARE IN DB!
    //We update our old servers with new data that we get
    Server.updateOne(
      {'server.name': server.name},
      {$set: {'server.days': server.days}},
      done,
    )
  }),
    function allDone(err) {
      console.log(err)
    }
}

//If servers is empty we want to load all data
let numServers = Server.countDocuments({}).then(count => {
  if (count === 0 || null || undefined) {
    loadData().then(console.log('Loading data...'))
  } else {
    const min = 60000
    const hour = 3600000
    //if servers is not empty we want to update that data
    console.log('Updating data...')
    //Update servers once an hour (setInterval)
    updateData()
      .then(console.log('data updated'))
      .catch(e => console.log(e))
    setInterval(() => {
      updateData()
        .then(console.log('data updated'))
        .catch(e => console.log(e))
    }, hour)
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
