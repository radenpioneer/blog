const minify = require('html-minifier')
const moment = require('moment')
const amphtml = require('@ampproject/eleventy-plugin-amp')
const pwa = require('eleventy-plugin-pwa')
moment.locale('id')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "assets/images": "assets/images",
        "assets/favicon": "assets/favicon",
        "src/favicon.ico": "favicon.ico"
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

    eleventyConfig.addFilter('dateIso', date => {
        return moment(date).toISOString()
    })

    eleventyConfig.addFilter('dateReadable', date => {
        return moment(date).format('LL')
    })

    eleventyConfig.addShortcode('currentYear', function() {
        return moment().utc().format('YYYY')
    })

    //markdown configs
    let markdownIt = require("markdown-it")
    let attrs = require("markdown-it-attrs")
    let figures = require("markdown-it-implicit-figures")
    let footnotes = require("markdown-it-footnote")
    let deflist = require("markdown-it-deflist")
    let emoji = require("markdown-it-emoji")

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

    eleventyConfig.setLibrary("md", markdownLib)

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

    eleventyConfig.setBrowserSyncConfig(require('./config/browsersync.config')('dist'))

    eleventyConfig.addPlugin(amphtml, {
        dir: {
            output: 'dist'
        },
        imageOptimization : {
            urlPath: '/assets/images/o/'
        }
    })

    eleventyConfig.addPlugin(pwa)

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}