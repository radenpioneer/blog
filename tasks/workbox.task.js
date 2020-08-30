const gulp = require('gulp')
const workbox = require('workbox-build')

const SWSRC = 'src/workbox/sw.js'
const SWDEST = 'dist/sw.js'

gulp.task('generatesw', () => {
    return workbox.injectManifest({
        swSrc: SWSRC,
        swDest: SWDEST,
        globDirectory: 'dist',
        globPatterns: [
            '*.*',
            '**/profile.jpg',
            '**/*-39.jpg',
            '**/*-82.jpg',
            'assets/media/madihin.mp4'
        ],
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024
    })
})

gulp.task('watchsw', function() {
    gulp.watch(SWDEST, gulp.parallel('generatesw'))
})