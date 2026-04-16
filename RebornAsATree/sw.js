const CACHE_NAME = 'reborn-as-a-tree-v1';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const localHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
  const isLocal = localHosts.includes(self.location.hostname) || self.location.hostname.startsWith('192.168.') || self.location.hostname.startsWith('10.') || self.location.hostname.startsWith('172.');
  if (isLocal) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
