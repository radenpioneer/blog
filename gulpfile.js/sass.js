const {src, dest} = require('gulp')
const replace = require('gulp-replace')
const pipeline = require('readable-stream').pipeline
const changed = require('gulp-changed')

//SASS Compiler
const sass = require('gulp-sass')
sass.compiler = require('sass')
const Fiber = require('fibers')

//PostCSS and plugins
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const importcss = require('postcss-import-url')
const tailwind = require('tailwindcss')

const SRC = './src/_scss/main.scss'
const DEST = './src/_includes/styles/'

function main() {
    let processors = [
        tailwind,
        autoprefixer,
        importcss
    ]
    return pipeline(
        src(SRC),
        changed(DEST),
        sass({fiber: Fiber}),
        postcss(processors),
        replace(' !important', ''),
        dest(DEST)
    )
}

exports.default = main