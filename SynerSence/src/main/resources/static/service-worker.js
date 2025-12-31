const CACHE = "synersence-v2";

const STATIC_FILES = [
  "/",
  "/patients/new",
  "/settings",
  "/settings/customize",
  "/css/index.css",
  "/css/setting.css",
  "/css/field-customize.css",
  "/js/offline.js",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // 🚫 NEVER cache POST
  if (e.request.method !== "GET") return;

  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
