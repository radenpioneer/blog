const environment = process.env.ELEVENTY_ENV
const PROD_ENV = 'prod'
const prodUrl = 'https://radenpioneer.xyz'
const devUrl = 'http://localhost:8080'
const baseUrl = environment === PROD_ENV ? prodUrl : devUrl
const isProd = environment === PROD_ENV

module.exports = {
    environment,
    isProd,
    site: {
        title: "Sastronegoro",
        description: "notes and thoughts",
        logo: "/assets/images/profile.jpg",
        url: baseUrl,
    }
}