const CACHE_NAME = "audio-cache-v1";
const AUDIO_FILES = [
  'https://efraimkaov.github.io//wpa/',
  'https://efraimkaov.github.io//wpa/index.html',
  'https://efraimkaov.github.io//wpa/assets/styles.css',
  'https://efraimkaov.github.io//wpa/zindex.html',
  'https://efraimkaov.github.io//wpa/app.js',
  'https://efraimkaov.github.io//wpa/assets/a.wav',
  'https://efraimkaov.github.io//wpa/assets/b.m4a',
  'https://efraimkaov.github.io//wpa/assets/b.mp3',
  'https://efraimkaov.github.io//wpa/assets/b.ogg',
  'https://efraimkaov.github.io//wpa/assets/b.wma',
  'https://efraimkaov.github.io//wpa/assets/b.wav'
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
