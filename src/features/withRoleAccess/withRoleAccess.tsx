import { Navigate } from 'react-router-dom';

import { withProtection } from '@features/withProtection';
import { PAGES } from '@shared/helpers';

import type { Role } from '@entities/user';
import type { FC } from 'react';

export const withRoleAccess =
  <Props extends object>(Component: FC<Props>) =>
  (...roles: Role[]) =>
    withProtection<Props>({
      Component,
      protector: ({ data }) => roles.some((role) => role === data?.role),
      Fallback: () => <Navigate to={PAGES.SCHEDULE.mask} replace />,
    });
