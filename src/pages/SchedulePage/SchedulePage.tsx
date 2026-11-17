import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { TableLayout } from '@features/TableLayout';

import { Schedule } from './features/Schedule';
import { ScheduleToolbar } from './features/ScheduleToolbar';
import { TeacherNavigation } from './features/TeacherNavigation';

import type { FC } from 'react';

const SchedulePage: FC = () => {
  return (
    <TableLayout
      title={
        <>
          <AccessRole role={Role.TEACHER}>
            {(teacher) => <TeacherNavigation teacher={teacher} />}
          </AccessRole>
          <AccessRole role={[Role.ADMIN, Role.PARENT, Role.STUDENT]}>
            Расписание
          </AccessRole>
        </>
      }
      tools={<ScheduleToolbar />}
    >
      <Schedule />
    </TableLayout>
  );
};

export default SchedulePage;
