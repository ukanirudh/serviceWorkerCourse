const STATIC_CACHE= 'static-v9';
const DYNAMIC_CACHE= 'dynamic-v2';

self.addEventListener('install', function (event) {
    console.log('[Service worker] installing service worker ...', event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function (cache) {
                console.log('precaching')
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/offline.html',
                    '/src/js/app.js',
                    '/src/js/feed.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    '/src/images/main-image.jpg',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                ])
            })
    );
})

self.addEventListener('activate', function (event) {
    console.log('[Service worker] activating service worker ...', event);
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== DYNAMIC_CACHE && key !== STATIC_CACHE) {
                    console.log('[Service worker] Removing old cache');
                    return caches.delete(key);
                }
            }))
        })
    )
    return self.clients.claim();
})
// Original Strategy.
// self.addEventListener('fetch', function (event) {
//     // console.log('[Service worker] logging fetch event ...', event);
//
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 if (response) {
//                     return response;
//                 } else {
//                     return fetch(event.request).then((res) => {
//                         return caches.open(DYNAMIC_CACHE).then((cachedDynamic) => {
//                             cachedDynamic.put(event.request.url, res.clone());
//                             return res;
//                         })
//                     }).catch((err) => {
//                         console.log('err', err);
//                         return caches.open(STATIC_CACHE)
//                             .then((staticCache) => {
//                                 return staticCache.match('/offline.html');
//                             })
//                     });
//                 }
//             }));
// })

// Network and then cache strategy
// self.addEventListener('fetch', function (event) {
//     // console.log('[Service worker] logging fetch event ...', event);
//
//     event.respondWith(
//         fetch(event.request)
//             .catch((err) => {
//                 return caches.match(event.request)
//             }));
// })

// // Cache only strategy
// self.addEventListener('fetch', function (event) {
//     event.respondWith(caches.match(event.request));
// })

// //Network only strategy
// self.addEventListener('fetch', function (event) {
//     event.respondWith(fetch(event.request));
// })

