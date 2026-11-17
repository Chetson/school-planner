import { useState } from 'react';

import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';

import { SaveThemes } from './features/SaveThemes';
import { UploadForm } from './features/UploadForm';

import type { UploadedThemes } from '@entities/theme';
import type { FC } from 'react';

export const UploadThemesPage: FC = () => {
  const [themes, setThemes] = useState<UploadedThemes | null>(null);

  const handleCancel = () => {
    setThemes(null);
  };

  return themes ? (
    <SaveThemes themes={themes} onCancel={handleCancel} />
  ) : (
    <UploadForm onUpload={setThemes} />
  );
};

export default withRoleAccess(UploadThemesPage)(Role.ADMIN, Role.TEACHER);
