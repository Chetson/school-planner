import { createBrowserRouter } from 'react-router-dom';

import { protectedRouter } from '@app/router/router.protected.tsx';
import { publicRouter } from '@app/router/router.public.tsx';

export const router = createBrowserRouter([
  ...publicRouter,
  ...protectedRouter,
]);
