let Lantern = require('src/app/Lantern').default
let config = require('src/config/app').default

let app = new Lantern(config)

module.exports = app

config.aliases.forEach(alias => {
  module.exports[alias] = app[alias]
})
