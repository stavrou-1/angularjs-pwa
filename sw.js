var cacheName = "news-v1";
var imageFactory = [
    '../images/black-tshirt.jpeg',
    '../images/gucci-shirt.jpeg',
    '../images/matching.jpeg',
    '../images/multiple-shirts.jpeg',
    '../images/outcast.jpeg',
    '../images/shoes.jpeg',
    '../images/teal.jpeg'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(imageFactory);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e => {
    var req = e.request;
    var url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    var cache = await caches.open(cacheName);
    var cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    var cache = await caches.open(cacheName);
    try {
        var fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        var cached = await cache.match(req);
        return cached;
    }
}