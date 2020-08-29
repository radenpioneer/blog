const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('eleventy:build', shell.task('npx @11ty/eleventy'))
gulp.task('eleventy:serve', shell.task('npx @11ty/eleventy --serve'))