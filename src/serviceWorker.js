import { skipWaiting, clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.pathname.startsWith('/build'),
  new StaleWhileRevalidate({
    cacheName: 'stale-while-revalidate',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.pathname.endsWith('.json'),
  new NetworkFirst({
    cacheName: 'network-first',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) =>
    request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'cache-first',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

addEventListener('message', (messageEvent) => {
  if (messageEvent.data && messageEvent.data.type === 'SKIP_WAITING') {
    console.log('[service-worker] skip waiting');
    skipWaiting();
  }
});
