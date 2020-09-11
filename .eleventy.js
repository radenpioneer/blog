const minify = require('html-minifier')
const amphtml = require('@ampproject/eleventy-plugin-amp')
const typeset = require('eleventy-plugin-typeset')

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "assets/img": "assets/img",
        "assets/favicon": "assets/favicon",
        "assets/media": "assets/media",
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

    //markdown configs
    let markdownIt = require("markdown-it")
    let attrs = require("markdown-it-attrs")
    let figures = require("markdown-it-implicit-figures")
    let footnotes = require("markdown-it-footnote")
    let deflist = require("markdown-it-deflist")
    let emoji = require("markdown-it-emoji")
    let anchor = require("markdown-it-anchor")
    let toc = require("markdown-it-toc-done-right")

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
        filter: /^.*(index|post|page|story|about|404|offline).*$/,
        dir: {
            output: 'dist'
        },
        imageOptimization : {
            urlPath: '/assets/img/o/'
        },
        validation: false
    })

    eleventyConfig.addPlugin(typeset({
        disable: ['ligatures']
    }))

    eleventyConfig.addPlugin(require('./plugins'))

    return {
        dir: {
            input: 'src',
            output: 'dist'
        }
    }
}