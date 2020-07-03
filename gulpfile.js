const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('buildcss', function() {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./_site/assets/css/'))
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('buildcss'))
})

gulp.task('build', gulp.parallel('buildcss'))