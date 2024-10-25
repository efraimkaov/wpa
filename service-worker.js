// Name of the cache
const CACHE_NAME = 'app-cache-v1';

// List of assets to cache (including index.html)
const urlsToCache = [
  'index.html',
  'css/styles.css',
  'style.css',
  'a2a00.wav',
  'a4a00.wav',
  'images/logo.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

// Install event: cache app resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // If the request matches a cached file, serve it
      return response || fetch(event.request).then(function(networkResponse) {
        // Dynamically cache new files
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(function() {
        // If both cache and network fail, return the cached index.html
        return caches.match('index.html');
      });
    })
  );
});

// Activate event: remove old caches if necessary
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
