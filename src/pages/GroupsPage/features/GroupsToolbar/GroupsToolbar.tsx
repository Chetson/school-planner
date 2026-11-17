import { Link } from 'react-router-dom';

import { Role } from '@entities/user';
import { ClassFilter } from '@features/ClassFilter';
import { SubjectFilter } from '@features/SubjectFilter';
import { UserFilter } from '@features/UserFilter';
import { IconKind, PAGES } from '@shared/helpers';
import { Button } from '@shared/ui';

export const GroupsToolbar = () => {
  return (
    <>
      <SubjectFilter />
      <ClassFilter />
      <UserFilter role={Role.TEACHER} />
      <Link to={PAGES.CREATE_GROUP.mask}>
        <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
          Добавить
        </Button>
      </Link>
    </>
  );
};
