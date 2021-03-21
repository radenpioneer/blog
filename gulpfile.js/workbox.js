const { injectManifest } = require('workbox-build')

const SWSRC = 'src/_sw/sw.js'
const SWDEST = 'dist/sw.js'

function main() {
    return injectManifest({
        swSrc: SWSRC,
        swDest: SWDEST,
        globDirectory: 'dist',
        globPatterns: [
            '**/profile.jpg',
            '**/*-39.jpg',
            '**/*-82.jpg',
            'android-chrome-*.jpg',
            'apple-touch-icon.png',
            'favicon-*.*',
            'site.webmanifest'
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
    })
}

exports.default = main