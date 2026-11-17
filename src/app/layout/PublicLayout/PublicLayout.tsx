import { Navigate, Outlet } from 'react-router-dom';

import { withProtection } from '@features/withProtection';
import { AppLogo } from '@shared/assets';
import { PAGES, useAuthOperationKind, useWidth } from '@shared/helpers';
import { AuthOperationKind } from '@shared/types';

import { Patterns } from './ui/Patterns';

import type { FC } from 'react';

const PublicLayout: FC = () => {
  const { operationKind } = useAuthOperationKind();
  const { isPhone } = useWidth();

  return (
    <div className="relative bg-bg-default h-full">
      <img
        src={AppLogo}
        className="absolute z-10 left-16 top-9 w-48"
      />
      <main className="relative h-full flex justify-center items-center z-10">
        <Outlet />
      </main>
      {!isPhone && (
        <Patterns isColorless={operationKind === AuthOperationKind.RESET} />
      )}
    </div>
  );
};

export default withProtection({
  Component: PublicLayout,
  protector: ({ data }) => !data,
  Fallback: () => <Navigate to={PAGES.SCHEDULE.mask} />,
});
