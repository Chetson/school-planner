import { NavLink } from 'react-router-dom';

import { Typography } from '../Typography';

import type { FC, PropsWithChildren } from 'react';

export interface TabProps {
  to: string;
  isActive?: boolean;
}

export const Navigation = ({ children }: PropsWithChildren) => (
  <nav className="flex w-full flex-wrap items-center gap-x-6">{children}</nav>
);

const Tab: FC<PropsWithChildren<TabProps>> = ({ children, to, isActive }) => (
  <NavLink to={to}>
    {(renderProps) => (
      <Typography
        className="inline text-nowrap"
        color={isActive ?? renderProps.isActive ? 'default' : 'secondary'}
        variant="h2"
      >
        {children}
      </Typography>
    )}
  </NavLink>
);

Navigation.Tab = Tab;
