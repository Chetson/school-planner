import { globalVariables } from '@shared/helpers';

import { withQueryString } from '../helpers';

import type { ApiSection } from './types';

const createUrl = (url: string): string =>
  `${globalVariables.BACKEND_URL}/${url}/`;

const apiSection: ApiSection = (...parts) => createUrl(parts.join('/'));

const apiJWT: ApiSection = (...parts) => apiSection('jwt', ...parts);
const apiUsers: ApiSection = (...parts) => apiSection('users', ...parts);
const apiRooms: ApiSection = (...parts) => apiSection('rooms', ...parts);
const apiClasses: ApiSection = (...parts) => apiSection('classes', ...parts);
const apiSubjects: ApiSection = (...parts) => apiSection('subjects', ...parts);
const apiGroups: ApiSection = (...parts) => apiSection('groups', ...parts);
const apiEvents: ApiSection = (...parts) => apiSection('lessons', ...parts);
const apiSettings: ApiSection = (...parts) => apiSection('settings', ...parts);
const apiActivities: ApiSection = (...parts) =>
  apiSection('activity-types', ...parts);
const apiGradebook: ApiSection = (...parts) =>
  apiSection('gradebook', ...parts);
const apiThemes: ApiSection = (...parts) => apiGradebook('themes', ...parts);

export const apiUrls = {
  JWT: {
    CREATE: apiJWT('create'),
    REFRESH: apiJWT('refresh'),
    VERIFY: apiJWT('verify'),
  },
  USERS: {
    RECOVER_PASSWORD: apiUsers('recover_password'),
    CURRENT: apiUsers('me'),
    CREATE: apiUsers(),
    USER: (id: number) => apiUsers(id),
    LIST: ({
      page,
      order,
      role,
      search,
      isBlocked,
      parentId,
      isCurator,
      currentClassId,
      curatedClassId,
    }: {
      page?: number;
      order?: string;
      role?: string[];
      search?: string;
      isBlocked?: boolean;
      parentId?: number;
      isCurator?: boolean;
      currentClassId?: number;
      curatedClassId?: number;
    }) =>
      withQueryString(apiUsers(), {
        role: role?.length ? role.join() : undefined,
        page,
        order,
        search: search || undefined,
        is_blocked: isBlocked,
        parent_id: parentId,
        is_curator: isCurator,
        current_class_id: currentClassId,
        curated_class_id: curatedClassId,
      }),

    VALIDATE_EXCEL: apiUsers('excel/validate'),
  },
  ROOMS: {
    LIST: (order?: string, page = 1, search?: string) =>
      withQueryString(apiRooms(), {
        page,
        order,
        room_name: search || undefined,
      }),
    CREATE: apiRooms(),
    ROOM: (id: number) => apiRooms(id),
  },
  CLASSES: {
    CREATE: apiClasses(),
    LIST: (search?: string, order?: string, page = 1) =>
      withQueryString(apiClasses(), {
        page,
        order,
        class_name: search || undefined,
      }),
    CLASS: (id: number) => apiClasses(id),
  },
  SUBJECTS: {
    LIST: (order?: string, name?: string, page = 1) =>
      withQueryString(apiSubjects(), { page, order, name: name || undefined }),
    CREATE: apiSubjects(),
    SUBJECT: (id: number) => apiSubjects(id),
  },
  GROUPS: {
    LIST: ({
      subjectId,
      classId,
      teacherId,
      order,
      search,
      page = 1,
    }: {
      subjectId?: number;
      classId?: number;
      teacherId?: number;
      order?: string;
      page?: number;
      search?: string;
    }) =>
      withQueryString(apiGroups(), {
        subject_id: subjectId,
        class_id: classId,
        teacher_id: teacherId,
        order,
        page,
        search: search || undefined,
      }),
    GROUP: (id: number) => apiGroups(id),
    CREATE: apiGroups(),
  },
  EVENTS: {
    EVENT: (id: number, eventDate: string) =>
      withQueryString(apiEvents(id), {
        event_date: eventDate,
      }),
    DELETE: (
      id: number,
      {
        isPermanent = undefined,
        eventDate,
      }: {
        isPermanent?: boolean;
        eventDate: string;
      },
    ) =>
      withQueryString(apiEvents(id), {
        is_permanent: isPermanent,
        event_date: eventDate,
      }),
    CREATE: apiEvents(),
    LIST: ({
      classId,
      subjectId,
      roomId,
      userId,
      start,
      end,
    }: {
      classId?: number;
      subjectId?: number;
      roomId?: number;
      userId?: number;
      start?: string;
      end?: string;
    }) =>
      withQueryString(apiEvents(), {
        date_start: start,
        date_end: end,
        user_id: userId,
        class_id: classId,
        subject_id: subjectId,
        room_id: roomId,
      }),
    VALIDATE_EXCEL: (dateStart: string, dateEnd: string) =>
      withQueryString(apiEvents('excel', 'validate'), {
        date_start: dateStart,
        date_end: dateEnd,
      }),
  },
  SETTINGS: {
    ALL: apiSettings(),
    TIMESLOTS: apiSettings('timeslots'),
    QUARTERS: apiSettings('quarters'),
  },
  ACTIVITIES: {
    CREATE: apiActivities(),
    LIST: (order?: string, name?: string, page = 1) =>
      withQueryString(apiActivities(), {
        order,
        name: name || undefined,
        page,
      }),
    ACTIVITY: (id: number) => apiActivities(id),
  },
  GRADEBOOK: {
    LIST: ({
      start,
      end,
      classId,
      subjectId,
      studentId,
    }: {
      start?: string;
      end?: string;
      classId?: number;
      subjectId?: number;
      studentId?: number;
    }) =>
      withQueryString(apiGradebook(), {
        date_start: start,
        date_end: end,
        class_id: classId,
        subject_id: subjectId,
        student_id: studentId,
      }),
    MODIFY_GRADE: (lessonId: number) => apiGradebook(lessonId, 'modify_grade'),
    DELETE_GRADE: (lessonId: number) => apiGradebook(lessonId, 'delete_grade'),
    MODIFY_PRESENCE: (lessonId: number) =>
      apiGradebook(lessonId, 'modify_presence'),
    MODIFY_COLUMN: (lessonId: number) =>
      apiGradebook(lessonId, 'modify_columns'),
    DELETE_COLUMN: (lessonId: number) =>
      apiGradebook(lessonId, 'delete_columns'),
    MODIFY_THEME: (lessonId: number) => apiGradebook(lessonId, 'modify_theme'),
  },
  THEMES: {
    LIST: (classId?: number, subjectId?: number, page = 1) =>
      withQueryString(apiThemes(), {
        class_id: classId,
        subject_id: subjectId,
        page,
      }),
    THEME: (id: number) => apiThemes(id),
    CREATE: apiThemes(),
    VALIDATE_EXCEL: (classId: number, subjectId: number) =>
      withQueryString(apiThemes('import', 'validate'), {
        class_id: classId,
        subject_id: subjectId,
      }),
    DUPLICATE: apiThemes('duplicate'),
    MOVE: (id: number, action: 'raise' | 'lower') => apiThemes(id, action),
  },
};
