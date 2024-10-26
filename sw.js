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

// Fetch event - serve cached files if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((response) => {
          // Cache new requests if they're in the AUDIO_FILES list
          if (AUDIO_FILES.includes(new URL(event.request.url).pathname)) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        })
      );
    })
  );
});
