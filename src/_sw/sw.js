importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js')

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst({cacheName: 'default'}))
workbox.recipes.pageCache()
workbox.recipes.staticResourceCache()
workbox.recipes.imageCache()
workbox.recipes.googleFontsCache()

const warmStrategy = new workbox.strategies.CacheFirst()
const urls = [
    '/offline.html',
    '/assets/img/offline.gif'
]

workbox.recipes.warmStrategyCache({urls, warmStrategy})

workbox.routing.registerRoute(
    ({ url }) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'GET',
)

workbox.routing.registerRoute(
    ({ url }) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'POST'
)