import { Navigate } from 'react-router-dom';

import { ProtectedLayout } from '@app/layout/ProtectedLayout';
import { RouterErrorElement } from '@app/router/lib';
import { PAGES } from '@shared/helpers';

import type { RouteObject } from 'react-router-dom';

const errorElement = <RouterErrorElement />;

export const protectedRouter: RouteObject[] = [
  {
    element: <ProtectedLayout />,
    errorElement,
    children: [
      {
        path: PAGES.USERS.mask,
        errorElement,
        children: [
          {
            path: PAGES.USERS.mask,
            lazy: () => import('@pages/UsersPage'),
          },
          {
            path: PAGES.USER.mask,
            lazy: () => import('@pages/UserPage'),
            handle: {
              crumb: PAGES.USER.crumb,
            },
          },
          {
            path: PAGES.CREATE_USER.mask,
            lazy: () => import('@pages/CreateUserPage'),
            handle: {
              crumb: PAGES.CREATE_USER.crumb,
            },
          },
          {
            path: PAGES.EDIT_USER.mask,
            lazy: () => import('@pages/EditUserPage'),
            handle: {
              crumb: PAGES.EDIT_USER.crumb,
            },
          },
          {
            path: PAGES.UPLOAD_USERS.mask,
            lazy: () => import('@pages/UploadUsersPage'),
            handle: {
              crumb: PAGES.UPLOAD_USERS.crumb,
            },
          },
        ],
      },
      {
        errorElement,
        children: [
          {
            path: PAGES.CLASSES.mask,
            lazy: () => import('@pages/ClassesPage'),
          },
          {
            path: PAGES.CREATE_CLASS.mask,
            lazy: () => import('@pages/CreateClassPage'),
            handle: {
              crumb: PAGES.CREATE_CLASS.crumb,
            },
          },
          {
            path: PAGES.EDIT_CLASS.mask,
            lazy: () => import('@pages/EditClassPage'),
            handle: {
              crumb: PAGES.EDIT_CLASS.crumb,
            },
          },
          {
            path: PAGES.GROUPS.mask,
            lazy: () => import('@pages/GroupsPage'),
          },
          {
            path: PAGES.CREATE_GROUP.mask,
            lazy: () => import('@pages/CreateGroupPage'),
            handle: {
              crumb: PAGES.CREATE_GROUP.crumb,
            },
          },
          {
            path: PAGES.EDIT_GROUP.mask,
            lazy: () => import('@pages/EditGroupPage'),
            handle: {
              crumb: PAGES.CREATE_GROUP.crumb,
            },
          },
          {
            path: PAGES.CLASSES_AND_GROUPS.mask,
            Component: () => <Navigate to={PAGES.CLASSES.mask} replace />,
          },
        ],
      },
      {
        path: PAGES.SUBJECTS.mask,
        lazy: () => import('@pages/SubjectsPage'),
        errorElement,
      },
      {
        path: PAGES.CREATE_SUBJECT.mask,
        lazy: () => import('@pages/CreateSubjectPage'),
        errorElement,
        handle: {
          crumb: PAGES.CREATE_SUBJECT.crumb,
        },
      },
      {
        path: PAGES.EDIT_SUBJECT.mask,
        lazy: () => import('@pages/EditSubjectPage'),
        errorElement,
        handle: {
          crumb: PAGES.EDIT_SUBJECT.crumb,
        },
      },

      {
        path: PAGES.ROOMS.mask,
        lazy: () => import('@pages/RoomsPage'),
        errorElement,
      },
      {
        path: PAGES.CREATE_ROOM.mask,
        lazy: () => import('@pages/CreateRoomPage'),
        errorElement,
        handle: {
          crumb: PAGES.CREATE_ROOM.crumb,
        },
      },
      {
        path: PAGES.EDIT_ROOM.mask,
        lazy: () => import('@pages/EditRoomPage'),
        errorElement,
        handle: {
          crumb: PAGES.EDIT_ROOM.crumb,
        },
      },
      {
        path: PAGES.SCHEDULE_CREATE_EVENT.mask,
        lazy: () => import('@pages/CreateEvent'),
        errorElement,
        handle: {
          crumb: PAGES.SCHEDULE_CREATE_EVENT.crumb,
        },
      },
      {
        path: PAGES.SCHEDULE_EDIT_EVENT.mask,
        lazy: () => import('@pages/EditEvent'),
        errorElement,
        handle: {
          crumb: PAGES.SCHEDULE_EDIT_EVENT.crumb,
        },
      },

      {
        path: PAGES.UPLOAD_SCHEDULE.mask,
        lazy: () => import('@pages/UploadSchedulePage'),
        handle: {
          crumb: PAGES.UPLOAD_SCHEDULE.crumb,
        },
      },
      {
        path: PAGES.SCHEDULE.mask,
        lazy: () => import('@pages/SchedulePage'),
        errorElement,
      },
      {
        errorElement,
        children: [
          {
            path: PAGES.JOURNAL_DETAILS.mask,
            lazy: () => import('@pages/GradebookDetailsPage'),
          },
          {
            path: PAGES.ACTIVITIES.mask,
            lazy: () => import('@pages/ActivitiesPage'),
          },
          {
            path: PAGES.CREATE_ACTIVITY.mask,
            lazy: () => import('@pages/CreateActivityPage'),
            handle: {
              crumb: PAGES.CREATE_ACTIVITY.crumb,
            },
          },
          {
            path: PAGES.EDIT_ACTIVITY.mask,
            lazy: () => import('@pages/EditActivityPage'),
            handle: {
              crumb: PAGES.EDIT_ACTIVITY.crumb,
            },
          },
          {
            path: PAGES.THEMES.mask,
            lazy: () => import('@pages/ThemesPage'),
          },
          {
            path: PAGES.CREATE_THEME.mask,
            lazy: () => import('@pages/CreateThemePage'),
            handle: {
              crumb: PAGES.CREATE_THEME.crumb,
            },
          },
          {
            path: PAGES.EDIT_THEME.mask,
            lazy: () => import('@pages/EditThemePage'),
            handle: {
              crumb: PAGES.EDIT_THEME.crumb,
            },
          },
          {
            path: PAGES.UPLOAD_THEMES.mask,
            lazy: () => import('@pages/UploadThemesPage'),
            handle: {
              crumb: PAGES.UPLOAD_THEMES.crumb,
            },
          },
          {
            path: PAGES.DUPLICATE_THEMES.mask,
            lazy: () => import('@pages/DuplicateThemesPage'),
            handle: {
              crumb: PAGES.DUPLICATE_THEMES.crumb,
            },
          },
          {
            path: PAGES.JOURNAL.mask,
            Component: () => (
              <Navigate to={PAGES.JOURNAL_DETAILS.mask} replace />
            ),
          },
        ],
      },
      {
        path: PAGES.MAIN.mask,
        Component: () => <Navigate to={PAGES.SCHEDULE.mask} replace />,
      },
      // {
      //   path: PAGES.STATISTICS.mask,
      //   element: <>statistics</>,
      // },
      // {
      //   path: PAGES.SETTINGS.mask,
      //   element: <>settings</>,
      // },
      // {
      //   path: PAGES.PROFILE.mask,
      //   element: <>profile</>,
      // },
    ],
  },
];
