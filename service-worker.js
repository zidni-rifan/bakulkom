const CACHE_NAME = "bakulkom-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/cart.html",
  "/pages/favorite.html",
  "/pages/profile.html",
  "src/css/main.css",
  "lib/css/materialize.min.css",
  "lib/js/materialize.min.js",
  "src/js/main.js",
  "assets/icons/avatar.svg",
  "assets/icons/cart-white.svg",
  "assets/icons/cart.svg",
  "assets/icons/home.svg",
  "assets/icons/icons-72.png",
  "assets/icons/icons-96.png",
  "assets/icons/icons-128.png",
  "assets/icons/icons-144.png",
  "assets/icons/icons-192.png",
  "assets/icons/icons-256.png",
  "assets/icons/icons-384.png",
  "assets/icons/icons-512.png",
  "assets/icons/love-fill.svg",
  "assets/icons/love-red.svg",
  "assets/icons/love-white.svg",
  "assets/icons/love.svg",
  "assets/icons/profile-white.svg",
  "assets/icons/profile.svg",
  "assets/icons/star-fill.svg",
  "assets/icons/star-half.svg",
  "assets/icons/star.svg",
  "assets/images/core-i9.jpg",
  "assets/images/monitor-samsung.jpg",
  "assets/images/mouse-razer.jpg",
  "assets/images/msi-rtx.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
