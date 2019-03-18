const express = require('express')
const app = express()
const port = 5000

const servers = require('./routes/api/servers')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Use Routes
app.use('/api/servers', servers)

app.get('/', (req, res) => {
  res.send('PORT 5000')
})

app.listen(port, err => {
  if (err) {
    console.log(err)
  }
  console.log(`listening on port + ${port}`)
})
