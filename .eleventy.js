const execSync = require('child_process').execSync
const minify = require('html-minifier')
const amphtml = require('@ampproject/eleventy-plugin-amp')
const typeset = require('eleventy-plugin-typeset')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "assets/img": "assets/img",
        "assets/static": ".",
        "assets/media": "assets/media"
    })

    eleventyConfig.addCollection("post", function(collection) {
        const coll = collection.getFilteredByTag("post")
        for (let i = 0; i < coll.length; i++) {
            const prevPost = coll[i-1]
            const nextPost = coll[i+1]

            coll[i].data["prevPost"] = prevPost
            coll[i].data["nextPost"] = nextPost
        }

        return coll
    })

    // watch targets
    eleventyConfig.addWatchTarget('./src/_scss/')
    eleventyConfig.addWatchTarget('./src/_sw/')
    eleventyConfig.addWatchTarget('./tailwind.config.js')

    // build events
    eleventyConfig.on('beforeBuild', function() {
        execSync('npx gulp sass')
    })

    eleventyConfig.on('afterBuild', function() {
        execSync('npx gulp workbox')
    })

    //markdown configs
    const markdownIt = require("markdown-it")
    const attrs = require("markdown-it-attrs")
    const figures = require("markdown-it-implicit-figures")
    const footnotes = require("markdown-it-footnote")
    const deflist = require("markdown-it-deflist")
    const emoji = require("markdown-it-emoji")
    const anchor = require("markdown-it-anchor")
    const toc = require("markdown-it-toc-done-right")

    let markdownLib = markdownIt({
                        html: true,
                        linkify: true
                      })
                      .use(attrs)
                      .use(figures, {
                        figcaption: true
                      })
                      .use(footnotes)
                      .use(deflist)
                      .use(emoji)
                      .use(anchor)
                      .use(toc)

    eleventyConfig.setLibrary("md", markdownLib)

    eleventyConfig.setBrowserSyncConfig(require('./config/browsersync.config')('dist'))

    eleventyConfig.addPlugin(typeset({
        only: '#postcontent, #pagecontent',
        disable: ['ligatures', 'hyphenate']
    }))

    eleventyConfig.addPlugin(require('./plugins'))

    eleventyConfig.addPlugin(amphtml, {
        dir: {
            output: 'dist'
        },
        imageOptimization : false,
        minifyCSS: false
    })

    eleventyConfig.addTransform("minify", function(content, outputPath) {
        if (outputPath.endsWith(".html")) {
            let minified  = minify.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                processScripts: [
                    "text/javascript",
                    "application/ld+json"
                ]
            })
            return minified
        }
        return content
    })

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}