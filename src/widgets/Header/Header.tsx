import { SearchField } from '@features/SearchField';

import { ProfileButton } from './features/ProfileButton';

import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="flex justify-end h-13 w-full gap-3">
      <SearchField />
      {/* <NotificationButton /> */}
      <ProfileButton />
    </header>
  );
};
