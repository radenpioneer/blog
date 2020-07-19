const fs = require('fs')
const minify = require('html-minifier')
const moment = require('moment')
moment.locale('id')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "assets": "assets",
        "node_modules/jquery/dist/jquery.min.js": "assets/js/jquery.min.js",
        "node_modules/lity/dist/lity.min.js": "assets/js/lity.min.js",
        "node_modules/dark-mode-toggle/dist/dark-mode-toggle.min.mjs": "assets/js/dark-mode-toggle.min.mjs",
        "manifest.json": "manifest.json"
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

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware('*', (req, res) => {
                    const content_404 = fs.readFileSync('_site/404.html')
                    res.write(content_404)
                    res.writeHead(404)
                    res.end()
                })
            }
        }
    })
}