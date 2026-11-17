import { Role, useCurrentUser } from '@entities/user';
import { useClassFilter } from '@features/ClassFilter';
import { useRoomFilter } from '@features/RoomFilter';
import { useSubjectFilter } from '@features/SubjectFilter';
import { useUserFilter } from '@features/UserFilter';
import { useScheduleTeacherView } from '@pages/SchedulePage/lib';

import {
  getFiltersForAdmin,
  getFiltersForParent,
  getFiltersForTeacher,
} from './helpers';
import { useChildFilter } from '../../ChildFilter';
import { useCuratedClassFilter } from '../../CuratedClassFilter';

import type { EventListFilters } from '@entities/event';

export const useScheduleFilters = (): EventListFilters | null => {
  const { data } = useCurrentUser();
  const view = useScheduleTeacherView();

  const [teacher] = useUserFilter(Role.TEACHER);
  const [subject] = useSubjectFilter();
  const [room] = useRoomFilter();
  const [cls] = useClassFilter();
  const [curatedCls] = useCuratedClassFilter();
  const [child] = useChildFilter();

  if (!data) return null;

  if (data.role === Role.ADMIN) {
    return getFiltersForAdmin(teacher, subject, room, cls);
  }

  if (data.role === Role.TEACHER) {
    return getFiltersForTeacher(data, room, cls, curatedCls, view);
  }

  if (data.role === Role.PARENT) {
    return getFiltersForParent(child);
  }

  if (data.role === Role.STUDENT) {
    return {};
  }

  return null;
};
