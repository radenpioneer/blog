const gulp = require('gulp')
const sass = require('gulp-sass')
const workbox = require('workbox-build')

gulp.task('css', function() {
    return gulp.src('./src/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/_includes/partials/'))
})

gulp.task('service-worker', () => {
    return workbox.generateSW({
        globDirectory: 'dist',
        globPatterns: [
            '*.*',
            '**/profile.jpg',
            '**/*-39.jpg',
            '**/*-82.jpg'
        ],
        swDest: 'dist/sw.js',
        sourcemap: false,
        clientsClaim: true,
        skipWaiting: true,
        offlineGoogleAnalytics: true,
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        runtimeCaching: [
            {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'images',
                    expiration: {
                        maxEntries: 10,
                        maxAgeSeconds: 60 * 60 * 24 * 3
                    }
                }
            },
            {
                urlPattern: /(.*\/post\/.*)$/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'posts',
                    expiration: {
                        maxAgeSeconds: 60 * 60 * 24 * 3
                    }
                }
            },
            {
                urlPattern: /(.*\/page\/.*)$/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'pages',
                    expiration: {
                        maxAgeSeconds: 60 * 60 * 24 * 3
                    }
                }
            }
        ]
    })
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))