const gulp = require('gulp')

//load all tasks from ./tasks/ directory
require('require-dir')('./tasks')

gulp.task('build', gulp.series('eleventy:build'))
gulp.task('serve', gulp.series('eleventy:serve'))