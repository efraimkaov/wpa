const CACHE_NAME = 'audio-cache-v1';
const AUDIO_FILES = [
    '/wpa/',
    '/wpa/index.html',
    '/wpa/styles.css',
    '/wpa/a.wav',
    '/wpa/b.wav'
];

self.addEventListener('install', function(event) {
    self.skipWaiting();  // Activate the service worker immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(AUDIO_FILES);
        })
    );
});

self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
