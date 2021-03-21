module.exports = {
    async onPreBuild({utils}) {
        await utils.cache.restore('./.cache')
    },
    async onPostBuild({utils}) {
        await utils.cache.save('./.cache')
    }
}