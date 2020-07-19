const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

gulp.task('css', function() {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./_site/assets/css/'))
})

gulp.task('clean', function() {
    return del([
        '.cache',
        '_site'
    ])
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))