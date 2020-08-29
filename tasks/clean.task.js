const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('clean:dist', shell.task('npx del-cli dist'))
gulp.task('clean:cache', shell.task('npx del-cli .cache'))
gulp.task('clean:debuglog', shell.task('npx del-cli debug.log'))

gulp.task('clean', gulp.parallel('clean:dist', 'clean:cache', 'clean:debuglog'))