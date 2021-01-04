const workbox = require('workbox-build')

const SWSRC = 'src/_sw/sw.js'
const SWDEST = 'dist/sw.js'

function main() {
    return workbox.injectManifest({
        swSrc: SWSRC,
        swDest: SWDEST,
        globDirectory: 'dist',
        globPatterns: [
            '*.*',
            '**/profile.jpg',
            '**/*-39.jpg',
            '**/*-82.jpg',
            'assets/media/offline.gif'
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
    })
}

exports.default = main