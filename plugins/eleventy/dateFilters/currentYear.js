const moment = require('moment')

module.exports = function() {
    return moment().utc().format('YYYY')
}