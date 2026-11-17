import { useCallback, useState } from 'react';

import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';

import { SaveScreen } from './screens';
import { UploadScreen } from './screens/UploadScreen';

import type { UploadedUsers } from './lib/types';
import type { FC } from 'react';

export const UploadUsersPage: FC = () => {
  const [uploadedUsers, setUploadedUsers] = useState<UploadedUsers | null>(
    null,
  );

  const handleCancel = useCallback(() => setUploadedUsers(null), []);

  return uploadedUsers ? (
    <SaveScreen users={uploadedUsers} onCancel={handleCancel} />
  ) : (
    <UploadScreen onUpload={setUploadedUsers} />
  );
};

export default withRoleAccess(UploadUsersPage)(Role.ADMIN);
