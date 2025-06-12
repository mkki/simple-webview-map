import { worker } from '@/mocks/browser';

export const initializeMockServiceWorker = async () => {
  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('Failed to start MSW', error);
  }
};
