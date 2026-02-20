const CACHE_NAME = 'pomodoro-v1';
const urlsToCache = [
    '/mi-primera-pwa/',
    '/mi-primera-pwa/index.html',
    '/mi-primera-pwa/manifest.json',
    '/mi-primera-pwa/icon-192.png',
    '/mi-primera-pwa/icon-512.png'
    // Si tuvieras archivos CSS/JS externos, añádelos aquí
];

// Instalación: abre el caché y agrega los archivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en caché');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Activación: limpia cachés antiguas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando caché antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interceptar peticiones y responder con caché si está disponible
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en caché, devuelve la copia; si no, busca en red
                return response || fetch(event.request);
            })
    );
});
