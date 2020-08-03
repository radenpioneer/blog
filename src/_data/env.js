const environment = process.env.ELEVENTY_ENV
const PROD_ENV = 'prod'
const prodUrl = 'https://radenpioneer.xyz'
const devUrl = 'http://localhost:8080'
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl
const isProd = environment === PROD_ENV

const dir = {
    images: `assets/img/`,
    favicons: `assets/favicon/`
}

module.exports = {
    environment,
    isProd,
    site: {
        title: "Sastronegoro",
        description: "notes and thoughts",
        logo: `${dir.images}/profile.jpg`,
        url: baseUrl,
        themeColor: "#0074D9",
        images: `${baseUrl}/${dir.images}`,
        favicons: `${baseUrl}/${dir.favicons}`
    }
}