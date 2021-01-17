// Clean output folder task
const del = require('del')

function main(cb) {
    del(['dist', 'debug.log', 'src/_includes/styles/'])
    cb()
}

function clearcache(cb) {
    del('.cache')
    cb()
}

exports.default = main
exports.clearcache = clearcache