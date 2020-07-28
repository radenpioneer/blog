const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('css', function() {
    return gulp.src('./src/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./src/_includes/partials/'))
})

gulp.task('watch', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('css'))
})

gulp.task('build', gulp.parallel('css'))