import { PublicLayout } from '@app/layout/PublicLayout';
import { RouterErrorElement } from '@app/router/lib';

import type { RouteObject } from 'react-router-dom';

const errorElement = <RouterErrorElement />;

export const publicRouter: RouteObject[] = [
  {
    element: <PublicLayout />,
    errorElement,
    children: [
      {
        path: '/auth',
        errorElement,
        lazy: async () => {
          const { AuthPage } = await import('@pages/AuthPage');

          return { Component: AuthPage };
        },
      },
    ],
  },
];
