import { Link } from 'react-router-dom';

import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { ClassFilter } from '@features/ClassFilter';
import { RoomFilter } from '@features/RoomFilter';
import { SubjectFilter } from '@features/SubjectFilter';
import { UserFilter } from '@features/UserFilter';
import { WeekFilter } from '@features/WeekFilter';
import { IconKind, PAGES } from '@shared/helpers';
import { Button } from '@shared/ui';

import { ChildFilter } from '../ChildFilter';
import { TeacherToolbar } from '../TeacherToolbar';

export const ScheduleToolbar = () => (
  <>
    <AccessRole role={Role.ADMIN}>
      <ClassFilter />
      <UserFilter role={Role.TEACHER} />
      <RoomFilter />
      <SubjectFilter />
    </AccessRole>
    <AccessRole role={Role.TEACHER}>
      {(teacher) => <TeacherToolbar teacher={teacher} />}
    </AccessRole>
    <AccessRole role={Role.PARENT}>
      <ChildFilter />
    </AccessRole>
    <WeekFilter />
    <AccessRole role={Role.ADMIN}>
      <Link to={PAGES.SCHEDULE_CREATE_EVENT.mask}>
        <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
          Добавить
        </Button>
      </Link>
      <Link to={PAGES.UPLOAD_SCHEDULE.mask}>
        <Button
          variant="secondary"
          isFullSize={false}
          leftElement={IconKind.DOWNLOAD}
        >
          Загрузить
        </Button>
      </Link>
    </AccessRole>
  </>
);
