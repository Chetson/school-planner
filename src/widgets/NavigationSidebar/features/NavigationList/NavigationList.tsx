import { useMemo } from 'react';

import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

import { useCurrentUser } from '@entities/user';
import { Icon } from '@shared/ui';

import { getNavRoutes } from './lib/routes';
import styles from './NavigationList.module.css';

import type { FC } from 'react';

export const NavigationList: FC = () => {
  const { data } = useCurrentUser();

  const routes = useMemo(() => getNavRoutes(data?.role), [data?.role]);

  return (
    <>
      <ul className="flex flex-col gap-3">
        {routes.map(({ path, title, icon }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                clsx(styles.item, { [styles.item_active]: isActive })
              }
            >
              {<Icon kind={icon} />}

              {title}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* <NavLink
        to={PAGES.SETTINGS.mask}
        className={({ isActive }) =>
          clsx(styles.item, { [styles.item_active]: isActive })
        }
      >
        <SettingIcon />

        {PAGES.SETTINGS.title}
      </NavLink> */}
    </>
  );
};
