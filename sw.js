const CACHE_NAME = "medlink-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./presentation.html",
  "./services.html",
  "./equipe.html",
  "./infos-pratiques.html",
  "./rendez-vous.html",
  "./hospitals.html",
  "./triage.html",
  "./consultation.html",
  "./confirmation.html",
  "./css/style.css",
  "./js/app.js",
  "./js/ui.js",
  "./assets/images/hgr-katwa-hero.jpg",
  "./assets/images/hgr-katwa-campus.jpg",
  "./assets/images/hgr-katwa-presentation.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
