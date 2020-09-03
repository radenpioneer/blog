const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('archive', shell.task('npx wayback-sitemap-archive https://www.radenpioneer.xyz/sitemap.xml'))