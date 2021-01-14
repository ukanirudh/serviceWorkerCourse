const STATIC_CACHE= 'static-v4';
const DYNAMIC_CACHE= 'dynamic';

self.addEventListener('install', function (event) {
    console.log('[Service worker] installing service worker ...', event);
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(function (cache) {
                console.log('precaching')
                return cache.addAll([
                    // '/',
                    '/index.html',
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

self.addEventListener('fetch', function (event) {
    // console.log('[Service worker] logging fetch event ...', event);

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request).then((res) => {
                        return caches.open(DYNAMIC_CACHE).then((cachedDynamic) => {
                            cachedDynamic.put(event.request.url, res.clone());
                            return res;
                        })
                    }).catch((err) => {
                        console.log('err', err);
                    });
                }
            }));
})
