import { Link } from 'react-router-dom';

import { AppLogo } from '@shared/assets';
import { PAGES } from '@shared/helpers';

import { NavigationList } from './features/NavigationList/NavigationList';

import type { FC } from 'react';

export const NavigationSidebar: FC = () => {
  return (
    <div className="relative h-full w-52 bg-bg-default rounded-3xl flex flex-col shrink-0 p-2">
      <Link to={PAGES.SCHEDULE.mask}>
        <img src={AppLogo} className="w-full h-21" alt="logo" />
      </Link>

      <nav className="h-full mt-3 flex flex-col justify-between overflow-y-auto">
        <NavigationList />
      </nav>
    </div>
  );
};
