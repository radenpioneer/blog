const path = require('path')
const Image = require('@11ty/eleventy-img')
const cheerio = require('cheerio')

function isUrl(url) {
    try {
        new URL(url)
        return true
    } catch(e) {
        return false
    }
}

module.exports = (content, outputPath) => {
    if(outputPath.endsWith('.html')) {
        let $ = cheerio.load(content)

        $('amp-img').each(async function() {
            let imgSrc = await $(this).attr('src')
            if (!isUrl(imgSrc)) {
                imgSrc = path.join(process.cwd(), imgSrc)
            }

            let imgData = await Image(imgSrc, {
                outputDir: './dist/assets/img/o/'
            })

            let jpeg = imgData.jpeg.pop()
            $(this).attr('src', jpeg.url )
        })
        return $.html()
    }
    return content 
}