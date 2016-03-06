var CACHE_NAME = 'cache-v1.2.1';
var cache_files = ['/', '/db/kanjidic2.json', '/js/bundle.js', '/build/css/style.css'];
//cache_files = [];

self.addEventListener('fetch', function(event) {
  console.log("fetch!");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          console.log(
            '[fetch] Returning from Service Worker cache: ',
            event.request.url
          );
          return response;
        }

        // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        console.log('[fetch] Returning from server: ', event.request.url);
        return fetch(event.request);
      }
    )
  );
});

// Install event - cache files (...or not)
// Be sure to call skipWaiting()!
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Important to `return` the promise here to have `skipWaiting()`
      // fire after the cache has been updated.
      return cache.addAll(cache_files);
    }).then(function() {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return self.skipWaiting();
    })
  );
});

// Activate event
// Be sure to call self.clients.claim()
self.addEventListener('activate', function(event) {
  // `claim()` sets this worker as the active worker for all clients that
  // match the workers scope and triggers an `oncontrollerchange` event for
  // the clients.
  console.log("activated!");
  return self.clients.claim();
});
