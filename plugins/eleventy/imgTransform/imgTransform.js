const path = require('path')
const Image = require('@11ty/eleventy-img')
const cheerio = require('cheerio')

function isAbsolute(url) {
    try {
        new URL(url)
        return true
    } catch(e) {
        return false
    }
}

function resolvePath(url) {
    if(isAbsolute) {
        return url
    } else {
        return path.join(process.cwd(), url)
    }
}

module.exports = function(content, outputPath) {
    if(outputPath.endsWith('.html')) {
        let $ = cheerio.load(content)
        $('amp-img').each(function() {
            let imgSrc = resolvePath($(this).attr('src'))
            let width = $(this).attr('width')

            let options = {
                outputDir: './dist/assets/img/o/',
                urlPath: '/assets/img/o/',
                widths: (width > 5) ? [parseInt(width)] : [240, 480, 640, 750, 828, 1080, 1200, 1920]
            }

            let data = Image.statsSync(imgSrc, options)

            $(this).attr('src', data.webp[data.webp.length - 1].url)
                   .attr('srcset', data.webp.map(img => img.srcset).join(', '))
        })

        return $.html()
    }    
    return content
}