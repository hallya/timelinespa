import { Workbox, messageSW } from 'workbox-window';

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/serviceWorker.js');
    let registration: ServiceWorkerRegistration | undefined = undefined;

    const showSkipWaitingPrompt = () => {
      if (
        registration && window.confirm(
          'Mettre à jour ? (rechargement automatique de la page)'
        )
      ) {
        wb.addEventListener('controlling', (event) => {
          console.log(`registration : ${JSON.stringify(registration)}`);
          if (registration && Object.keys(registration).length === 0) {
            window.location.reload();
          }
        });

        if (registration && registration.waiting) {
          messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        }
      }
    };

    wb.addEventListener('waiting', showSkipWaitingPrompt);

    wb.register().then((r) => (registration = r));
  }
}
