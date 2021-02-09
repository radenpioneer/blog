const moment = require('moment')
moment.locale('id')

module.exports = (date) => {
    return moment(date).format('LL')
}