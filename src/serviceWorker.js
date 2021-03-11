import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// to be used later maybe
// registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   new NetworkFirst({
//     cacheName: 'pages',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [200],
//       }),
//     ],
//   })
// );

registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 1, // 1 Days
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/assets/project.json'),
  new NetworkFirst({
    cacheName: 'project',
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 2, // 2 Days
      }),
    ],
  })
);

addEventListener('message', (messageEvent) => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});
