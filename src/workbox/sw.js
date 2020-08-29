importScripts('/workbox-v5.1.3/workbox-sw.js')
workbox.setConfig({
    modulePathPrefix: '/workbox-v5.1.3'
})

workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 30 * 3,
                maxEntries: 10
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50
            })
        ]
    })
)

workbox.routing.registerRoute(
    /(.*\/post\/.*)$/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'posts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 10
            })
        ]
    })
)

workbox.routing.registerRoute(
    /(.*\/page\/.*)$/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 10
            })
        ]
    })
)

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);