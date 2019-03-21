const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 5000

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

// loadData()
// .then(console.log('Data succesfully loaded to DB'))
// .catch(e => console.log(e))

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
