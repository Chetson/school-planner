import { ScheduleTeacherView } from '@pages/SchedulePage/lib';

import type { ClassBaseModel } from '@entities/class';
import type {
  AdminEventListFilters,
  ParentEventListFilters,
  TeacherEventListFilters,
} from '@entities/event';
import type { RoomBaseModel } from '@entities/room';
import type { SubjectBaseModel } from '@entities/subject';
import type { UserBaseModel, UserModel } from '@entities/user';

export const getFiltersForAdmin = (
  teacher: UserBaseModel | null,
  subject: SubjectBaseModel | null,
  room: RoomBaseModel | null,
  cls: ClassBaseModel | null,
): AdminEventListFilters | null => {
  if (teacher || cls || subject || room) {
    return {
      userId: teacher?.id,
      classId: cls?.id,
      subjectId: subject?.id,
      roomId: room?.id,
    };
  }

  return null;
};

export const getFiltersForTeacher = (
  currentUser: UserModel,
  room: RoomBaseModel | null,
  cls: ClassBaseModel | null,
  curatedCls: ClassBaseModel | null,
  view: ScheduleTeacherView,
): TeacherEventListFilters | null => {
  if (view === ScheduleTeacherView.MY_SCHEDULE) {
    return {
      classId: cls?.id,
      roomId: room?.id,
      userId: currentUser.id,
    };
  }

  if (view === ScheduleTeacherView.CURATED_CLASSES_SCHEDULE) {
    return { classId: curatedCls?.id };
  }

  if (cls || room) {
    return {
      classId: cls?.id,
      roomId: room?.id,
    };
  }

  return null;
};

export const getFiltersForParent = (
  child: UserBaseModel | null,
): ParentEventListFilters | null => {
  if (child?.id) return { userId: child?.id };

  return null;
};
