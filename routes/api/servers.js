const express = require('express')
const router = express.Router()
const scraper = require('../../scrape')
const app = express()

//@route GET /servers
//@desc Get all servers
//@access Public

router.get('/servers', async (request, response) => {
  try {
    const servers = await scraper()
    response.json(servers)
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
