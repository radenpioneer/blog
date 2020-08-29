const gulp = require('gulp')

//load all tasks from ./tasks/ directory
require('require-dir')('./tasks')

gulp.task('build', gulp.series('clean', 'generatecss', 'eleventy:build', 'generatesw'))
gulp.task('serve', gulp.series('build', gulp.parallel('watchcss', 'watchsw', 'eleventy:serve')))