const scraper = require('./scrape')

//Load server module
const Server = require('./models/Server')

//Scrape and load all servers to MongoDB (Initial load)
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

//Scrape servers once an hour (setInterval)
const min = 60
const hour = min*60*100
setInterval(() => {
    
},min)



module.exports = () => {
  return {
    initialLoad: loadData(),
    loopScraper: 
 }
}