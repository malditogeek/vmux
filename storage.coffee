levelup = require('level')
db = levelup('./db')

module.exports = {db: db}
