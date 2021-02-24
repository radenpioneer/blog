import { 
    pageCache,
    staticResourceCache,
    imageCache,
    googleFontsCache,
    warmStrategyCache
 } from 'workbox-recipes'

import { CacheFirst, NetworkOnly, NetworkFirst } from 'workbox-strategies'
import { registerRoute, setDefaultHandler } from 'workbox-routing'
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)
setDefaultHandler(new NetworkFirst({cacheName: 'default'}))
pageCache()
staticResourceCache()
imageCache()
googleFontsCache()

const warmStrategy = new CacheFirst()
const urls = [
    '/offline.html',
    '/assets/img/offline.gif'
]

warmStrategyCache({urls, warmStrategy})

registerRoute(
    ({ url }) => url.pathname.includes('browser-sync'),
    new NetworkOnly(),
    'GET',
)

registerRoute(
    ({ url }) => url.pathname.includes('browser-sync'),
    new NetworkOnly(),
    'POST'
)