const moment = require('moment')
moment.locale('id')

const minify = require('html-minifier')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "assets": "assets",
        "node_modules/normalize.css/normalize.css": "assets/css/normalize.css",
        "node_modules/basscss/css/basscss.min.css": "assets/css/basscss.min.css",
        "node_modules/jquery/dist/jquery.min.js": "assets/js/jquery.min.js",
        "node_modules/lity/dist/lity.min.js": "assets/js/lity.min.js",
        "node_modules/lity/dist/lity.min.css": "assets/css/lity.min.css",
        "node_modules/dark-mode-toggle/dist/dark-mode-toggle.min.mjs": "assets/js/dark-mode-toggle.min.mjs",
        "node_modules/pdfobject/pdfobject.min.js": "assets/js/pdfobject.min.js",
        "_redirects": "_redirects"
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

    //markdown configs
    let markdownIt = require("markdown-it")
    let markdownAttrs = require("markdown-it-attrs")
    let markdownFigures = require("markdown-it-implicit-figures")
    let markdownFootnotes = require("markdown-it-footnote")

    let markdownLib = markdownIt({
                        html: true
                      })
                      .use(markdownAttrs)
                      .use(markdownFigures, {
                        figcaption: true
                      })
                      .use(markdownFootnotes)

    eleventyConfig.setLibrary("md", markdownLib)

    eleventyConfig.addTransform("minify", function(content, outputPath) {
        if (outputPath.endsWith(".html")) {
            let minified  = minify.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                processScripts: [
                    "text/javascript",
                    "application/ld+json"
                ]
            })
            return minified
        }
        return content
    })
}