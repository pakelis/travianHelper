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
        .then()
        .catch(e => console.log(e))
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = () => {
  return {
    initialLoad: loadData(),
  }
}
