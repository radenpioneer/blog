module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter(
        'dateIso',
        require('./dateIso')
    )

    eleventyConfig.addFilter(
        'dateReadable',
        require('./dateReadable')
    )

    eleventyConfig.addShortcode(
        'currentYear',
        require('./currentYear')
    )
}