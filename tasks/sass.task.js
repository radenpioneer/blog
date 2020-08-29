const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('sass')

gulp.task('generatecss', function() {
    return gulp.src('./src/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/_includes/partials/'))
})

gulp.task('watchcss', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('generatecss'))
})