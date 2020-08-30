const gulp = require('gulp')
const replace = require('gulp-replace')
const pipeline = require('readable-stream').pipeline
const changed = require('gulp-changed')

//SASS Compiler
const sass = require('gulp-sass')
sass.compiler = require('sass')

//PostCSS and plugins
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')

const SRC = './src/sass/style.scss'
const DEST = './src/_includes/partials/'
const WATCH = './src/sass/*.scss'

gulp.task('generatecss', function() {
    let processors = [
        autoprefixer,
        importcss
    ]
    return pipeline(
        gulp.src(SRC),
        changed(DEST),
        sass({outputStyle: 'compressed'}),
        postcss(processors),
        replace(' !important', ''),
        gulp.dest(DEST)
    )
})

gulp.task('watchcss', function() {
    gulp.watch(WATCH, gulp.parallel('generatecss'))
})