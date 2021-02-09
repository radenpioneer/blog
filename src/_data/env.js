const environment = process.env.ELEVENTY_ENV
const PROD_ENV = 'prod'
const prodUrl = 'https://radenpioneer.netlify.app'
const devUrl = 'http://localhost:8888'
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl
const isProd = environment === PROD_ENV

const dir = {
    images: `/assets/img/`,
    favicons: `/assets/favicon/`
}

module.exports = {
    environment,
    isProd,
    site: {
        title: "radenpioneer",
        description: "notes and thoughts",
        logo: `${dir.images}profile.jpg`,
        url: baseUrl,
        themeColor: "#0074D9",
        images: `${baseUrl}${dir.images}`,
        favicons: `${baseUrl}${dir.favicons}`
    }
}