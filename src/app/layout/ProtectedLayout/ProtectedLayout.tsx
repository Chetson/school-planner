import { Navigate, Outlet } from 'react-router-dom';

import { PersistSearchParams } from '@features/PersistSearchParams';
import { SearchVisibleProvider } from '@features/SearchField';
import { withProtection } from '@features/withProtection';
import { PAGES } from '@shared/helpers';
import { Header } from '@widgets/Header';
import { NavigationSidebar } from '@widgets/NavigationSidebar';

import styles from './ProtectedLayout.module.css';

import type { FC } from 'react';

const ProtectedLayout: FC = () => (
  <SearchVisibleProvider>
    <PersistSearchParams />
    <div className={styles.wrapper}>
      <NavigationSidebar />
      <div className="h-full w-full overflow-auto flex flex-col gap-12">
        <Header />
        <main className="overflow-auto h-full relative w-full">
          <Outlet />
        </main>
      </div>
    </div>
  </SearchVisibleProvider>
);

export default withProtection({
  Component: ProtectedLayout,
  protector: ({ isError, data }) => Boolean(!isError && data),
  Fallback: () => <Navigate to={PAGES.AUTH.mask} />,
});
