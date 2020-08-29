const gulp = require('gulp')
const workbox = require('workbox-build')

gulp.task('generatesw', () => {
    return workbox.injectManifest({
        swSrc: 'src/workbox/sw.js',
        swDest: 'dist/sw.js',
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
    gulp.watch('./src/workbox/sw.js', gulp.parallel('generatesw'))
})