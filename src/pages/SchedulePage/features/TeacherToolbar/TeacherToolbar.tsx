import { ClassFilter } from '@features/ClassFilter';
import { RoomFilter } from '@features/RoomFilter';
import {
  ScheduleTeacherView,
  useScheduleTeacherView,
} from '@pages/SchedulePage/lib';

import { CuratedClassFilter } from '../CuratedClassFilter';

import type { TeacherModel } from '@entities/user';
import type { FC } from 'react';

export type TeacherToolbarProps = {
  teacher: TeacherModel;
};

export const TeacherToolbar: FC<TeacherToolbarProps> = ({ teacher }) => {
  const view = useScheduleTeacherView();

  if (view === ScheduleTeacherView.CURATED_CLASSES_SCHEDULE) {
    return <CuratedClassFilter teacher={teacher} />;
  }

  if (view === ScheduleTeacherView.COMMON_SCHEDULE) {
    return (
      <>
        <ClassFilter />
        <RoomFilter />
      </>
    );
  }

  if (view === ScheduleTeacherView.MY_SCHEDULE) {
    return <ClassFilter />;
  }
};
