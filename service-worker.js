// Service Worker mínimo para que la PWA sea instalable
self.addEventListener('install', event => {
    console.log('✅ SW instalado');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('✅ SW activado');
    return self.clients.claim();
});

// No necesitas cachear nada para el MVP, pero este fetch evita errores
self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
});
