import { Role } from '@entities/user';
import { IconKind } from '@shared/helpers';
import { PAGES } from '@shared/helpers';

export const getNavRoutes = (role?: Role | null) => {
  const routes = [
    (role === Role.ADMIN || role === Role.TEACHER) && {
      path: PAGES.USERS.mask,
      title: PAGES.USERS.title,
      icon: IconKind.ADDRESS_BOOK,
    },
    (role === Role.ADMIN || role === Role.TEACHER) && {
      path: PAGES.ROOMS.mask,
      title: PAGES.ROOMS.title,
      icon: IconKind.KEY,
    },
    role === Role.ADMIN && {
      path: PAGES.SUBJECTS.mask,
      title: PAGES.SUBJECTS.title,
      icon: IconKind.DAIRY,
    },
    role === Role.ADMIN && {
      path: PAGES.CLASSES_AND_GROUPS.mask,
      title: PAGES.CLASSES_AND_GROUPS.title,
      icon: IconKind.USERS_GROUP,
    },
    {
      path: PAGES.SCHEDULE.mask,
      title: PAGES.SCHEDULE.title,
      icon: IconKind.CALENDAR,
    },
    {
      path: PAGES.JOURNAL.mask,
      title: PAGES.JOURNAL.title,
      icon: IconKind.JOURNAL,
    },
    // {
    //   path: PAGES.STATISTICS.mask,
    //   title: PAGES.STATISTICS.title,
    //   icon: IconKind.BARS,
    // },
    // { path: PAGES.MAIN.mask, title: PAGES.MAIN.title, icon: IconKind.HOME },
  ];

  return routes.filter(Boolean) as {
    path: string;
    title: string;
    icon: IconKind;
  }[];
};
