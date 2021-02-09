module.exports = function(eleventyConfig) {
    eleventyConfig.addTransform('imgTransform', require('./imgTransform'))
}