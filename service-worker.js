const CACHE_NAME = 'audio-cache-v1';
const AUDIO_FILES = [
    '/wpa/a.wav',
    '/wpa/b.wav'
];

// Install event - caches audio files
self.addEventListener('install', function(event) {
    self.skipWaiting();  // Activate the new service worker immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(AUDIO_FILES);
        })
    );
});

// Activate event - clears old caches if any
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

// Fetch event - serves files from cache first, falls back to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

