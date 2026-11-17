import { NavLink } from 'react-router-dom';

import { PAGES } from '@shared/helpers';

import { LinkTitle } from './ui/LinkTitle';

import type { FC } from 'react';

export interface ClassesGroupsNavigationProps {
  classesCount?: number;
  groupsCount?: number;
}

export const ClassesGroupsNavigation: FC<ClassesGroupsNavigationProps> = ({
  classesCount,
  groupsCount,
}) => {
  return (
    <nav className="flex w-full items-center gap-6">
      <NavLink to={PAGES.CLASSES.mask}>
        {({ isActive }) => (
          <LinkTitle text="Классы" isActive={isActive} count={classesCount} />
        )}
      </NavLink>
      <NavLink to={PAGES.GROUPS.mask}>
        {({ isActive }) => (
          <LinkTitle text="Группы" isActive={isActive} count={groupsCount} />
        )}
      </NavLink>
    </nav>
  );
};
