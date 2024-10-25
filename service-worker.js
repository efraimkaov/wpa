const CACHE_NAME = 'audio-cache-v1';
const AUDIO_FILES = [
    'a2a00.wav',
    'a4a00.wav',
    // List all 180 WAV file paths here
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(AUDIO_FILES);
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
