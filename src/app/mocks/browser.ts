import { setupWorker } from 'msw/browser';

import eventsHandlers from './handlers/events';
import authHandlers from './handlers/jwt';
import settingsHandlers from './handlers/settings';
import usersHandlers from './handlers/users';

export const worker = setupWorker(
  ...authHandlers,
  ...usersHandlers,
  ...settingsHandlers,
  ...eventsHandlers,
);
