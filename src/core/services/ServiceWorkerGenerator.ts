export class ServiceWorkerGenerator {
  /**
   * Gera o conteúdo do ficheiro sw.js com uma estratégia de cache moderna.
   */
  public static generate(cachePrefix: string, startUrl: string, extraAssets: string[] = []): string {
    const safePrefix = cachePrefix.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Caminhos relativos './' garantem suporte em subdiretórios (ex: GitHub Pages)
    const allAssets = Array.from(new Set([
      startUrl,
      './',
      './index.html',
      './manifest.json',
      ...extraAssets.map(asset => `./${asset}`)
    ]));

    const assetsString = JSON.stringify(allAssets, null, 2);

    return `
const CACHE_NAME = '${safePrefix}-v1';

const ASSETS_TO_CACHE = ${assetsString};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name.startsWith('${safePrefix}')) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignora métodos que não sejam GET
  if (event.request.method !== 'GET') return;

  // Proteção contra esquemas não suportados (ex: chrome-extension://)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse.ok) {
          // Clona a resposta imediatamente antes que a stream seja consumida pelo browser
          const responseToCache = networkResponse.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        console.warn('Recurso offline não disponível:', event.request.url);
      });

      return cachedResponse || fetchPromise;
    })
  );
});
`.trim();
  }
}