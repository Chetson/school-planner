import { useLocation } from 'react-router-dom';

import { TABS_BY_PAGE } from '@shared/helpers';
import { Navigation } from '@shared/ui';

import { getRootPath } from './helpers';

import type { TabRoute } from './types';
import type { FC } from 'react';

export interface RouterNavigationProps {
  routes?: TabRoute[];
}

export const RouterNavigation: FC<RouterNavigationProps> = ({ routes }) => {
  const location = useLocation();

  const defaultTabRoutes = TABS_BY_PAGE[getRootPath(location.pathname)];

  return (
    <Navigation>
      {(routes?.length ? routes : defaultTabRoutes).map(({ to, title }) => (
        <Navigation.Tab key={to} to={to}>
          {title}
        </Navigation.Tab>
      ))}
    </Navigation>
  );
};
