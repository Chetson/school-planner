import { globalVariables } from '@shared/helpers';

export const setupMocking = async (): Promise<
  ServiceWorkerRegistration | undefined
> => {
  if (globalVariables.IS_MOCK) {
    const { worker } = await import('./browser');

    return worker.start();
  }
};
