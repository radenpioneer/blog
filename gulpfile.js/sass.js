const {src, dest} = require('gulp')
const pipeline = require('readable-stream').pipeline

//SASS Compiler
const sass = require('gulp-sass')
sass.compiler = require('sass')
const Fiber = require('fibers')

//PostCSS and plugins
const postcss = require('gulp-postcss')
const polyfills = require('postcss-preset-env')
const importcss = require('postcss-import-url')
const tailwind = require('tailwindcss')

const SRC = './src/_scss/*.scss'
const DEST = './src/_includes/styles/'

function main() {
    let processors = [
        tailwind,
        importcss,
        polyfills
    ]
    return pipeline(
        src(SRC),
        sass({fiber: Fiber}),
        postcss(processors),
        dest(DEST)
    )
}

exports.default = main