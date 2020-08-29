const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('sass')
const replace = require('gulp-replace')

//PostCSS and plugins
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')

gulp.task('generatecss', function() {
    let processors = [
        autoprefixer,
        importcss
    ]
    return gulp.src('./src/sass/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(replace(' !important', ''))
    .pipe(gulp.dest('./src/_includes/partials/'))
})

gulp.task('watchcss', function() {
    gulp.watch('./src/sass/*.scss', gulp.parallel('generatecss'))
})