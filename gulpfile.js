const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('css', function() {
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css/'))
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))