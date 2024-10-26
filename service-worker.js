const CACHE_NAME = "audio-cache-v1";
const AUDIO_FILES = [
  '/wpa/',
  '/wpa/index.html',
  '/wpa/assets/styles.css',
  '/wpa/zindex.html',
  '/wpa/app.js',
  '/wpa/assets/a.wav',
  '/wpa/assets/b.wav'
];

// Install event - pre-cache all audio files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(AUDIO_FILES);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Fallback to cached audio if the user is offline and the file is in the cache
          if (AUDIO_FILES.includes(new URL(event.request.url).pathname)) {
            return caches.match(event.request);
          }
        })
      );
    })
  );
});
