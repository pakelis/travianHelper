const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const scraper = require('./scrape')
const port = process.env.port || 5000

//Load server module
const Server = require('./models/Server')

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

//Scrape and load all servers to MongoDB
async function loadData() {
  try {
    const servers = await scraper()
    for await (const item of servers) {
      const newServer = new Server({
        server: {
          name: item.name,
          days: item.days,
        },
      })

      newServer
        .save()
        .then(server => console.log(server))
        .catch(e => console.log(e))
    }
  } catch (err) {
    console.log(err)
  }
}

loadData()
  .then(console.log('Data succesfully loaded to DB'))
  .catch(e => console.log(e))

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
