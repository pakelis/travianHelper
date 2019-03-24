const fetch = require('node-fetch')
const cheerio = require('cheerio')

const serverList = [
  'https://servers.travibot.com/?domain=travian.ae&l=en', // ae
  'https://servers.travibot.com/?domain=anglosphere.travian.com&l=en', // gb
  'https://servers.travibot.com/?domain=arabia.travian.com&l=en', // arabia
  'https://servers.travibot.com/?domain=balkans.travian.com&l=en', //balkan
  'https://servers.travibot.com/?domain=baltics.travian.com&l=en', // baltics
  'https://servers.travibot.com/?domain=chinese.travian.com&l=en', // china
  'https://servers.travibot.com/?domain=travian.com&l=en', // com
  'https://servers.travibot.com/?domain=czsk.travian.com&l=en', //czsk
  'https://servers.travibot.com/?domain=travian.de&l=en', // de
  'https://servers.travibot.com/?domain=travian.com.eg&l=en', // 10 //eg
  'https://servers.travibot.com/?domain=travian.fr&l=en', // fr
  'https://servers.travibot.com/?domain=hispano.travian.com&l=en', // hispano
  'https://servers.travibot.com/?domain=travian.hu&l=en', // hu
  'https://servers.travibot.com/?domain=travian.co.id&l=en', // id
  'https://servers.travibot.com/?domain=travian.co.il&l=en', // il
  'https://servers.travibot.com/?domain=travian.ir&l=en', // ir
  'https://servers.travibot.com/?domain=travian.it&l=en', // it ?
  'https://servers.travibot.com/?domain=travian.jp&l=en', // jp
  'https://servers.travibot.com/?domain=lusobrasileiro.travian.com&l=en',
  'https://servers.travibot.com/?domain=travian.com.my&l=en', // 20
  'https://servers.travibot.com/?domain=travian.nl&l=en',
  'https://servers.travibot.com/?domain=nordics.travian.com&l=en',
  'https://servers.travibot.com/?domain=travian.pl&l=en',
  'https://servers.travibot.com/?domain=travian.ro&l=en',
  'https://servers.travibot.com/?domain=travian.ru&l=en',
  'https://servers.travibot.com/?domain=travian.com.sa&l=en',
  'https://servers.travibot.com/?domain=travian.asia&l=en',
  'https://servers.travibot.com/?domain=travian.com.tr&l=en',
  'https://servers.travibot.com/?domain=travian.com.vn&l=en',
  'https://servers.travibot.com/?domain=travian.lt&l=en', // 30
]

function getCheerioPage(url) {
  return fetch(url)
    .then(r => r.text())
    .then(html => cheerio.load(html))
}

async function scrapeTravibot(serversList) {
  const servers = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [], // 10
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [], //20
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [], // 30
  ]

  // .entries to get index of for of loop
  for (const [index, server] of serversList.entries()) {
    const $ = await getCheerioPage(server)

    $('tbody tr').each((i, el) => {
      // gets each table row
      const link = $(el)
        .find('a')
        .attr('href')

      const name = $(el)
        .find('td')
        .has('span')
        .text()

      if (name.substring(0, 1) === ' ') {
        servers[index].push(`${link}${name.substring(0, 12)}`)
      } else if (name.substring(1, 2) === ' ') {
        servers[index].push(`${link} ${name.substring(0, 1)}`)
      } else if (name.substring(2, 3) === ' ') {
        servers[index].push(`${link} ${name.substring(0, 2)}`)
      } else {
        servers[index].push(`${link} ${name.substring(0, 3)}`)
      }
      if (i === 0) servers[index].pop() // first always undefined
    })
  }

  return {
    ae: servers[0],
    gb: servers[1],
    arabia: servers[2],
    balkan: servers[3],
    baltic: servers[4],
    china: servers[5],
    com: servers[6],
    czsk: servers[7],
    de: servers[8],
    eg: servers[9], // 10
    fr: servers[10],
    hisp: servers[11],
    hu: servers[12],
    id: servers[13],
    il: servers[14],
    ir: servers[15],
    it: servers[16],
    jp: servers[17],
    luso: servers[18],
    my: servers[19], //20
    nl: servers[20],
    nord: servers[21],
    pl: servers[22],
    ro: servers[23],
    ru: servers[24],
    sa: servers[25],
    th: servers[26],
    tr: servers[27],
    vn: servers[28],
    lt: servers[29],
    //30
  }
}

// scrapeTravibot(serverList)
// .then(console.log)
// .catch(console.error)

// this is how to export async func!
module.exports = () => {
  return (
    scrapeTravibot(serverList)
      //Return object inside of array with server names and days left, so it could be easier to work with
      .then(servers => {
        let name
        let days
        let result = []
        let server

        for (const [key, value] of Object.entries(servers)) {
          for (const link of value) {
            //get only name
            name = link.substr(0, link.indexOf(' '))
            //delete http from the start
            name2 = name.replace(/^https?:\/\//, '')
            //delete last character
            name3 = name2.substr(0, name2.length - 1)
            days = link.substr(link.indexOf(' ') + 1)
            days1 = parseInt(days)
            server = {
              name: name3,
              days: days1,
            }
            result.push(server)
          }
        }

        return result
      }) // return all servers
      .catch(console.error)
  )
}
