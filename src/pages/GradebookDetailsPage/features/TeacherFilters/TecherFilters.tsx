import { ClassFilter } from '@features/ClassFilter';
import {
  GradebookTeacherView,
  useGradebookTeacherView,
} from '@features/GradebookNavigation';
import { SubjectFilter } from '@features/SubjectFilter';

import type { FC } from 'react';

export const TeacherFilters: FC = () => {
  const view = useGradebookTeacherView();

  if (view === GradebookTeacherView.COMMON_GRADEBOOK) {
    return (
      <>
        <ClassFilter />
        <SubjectFilter />
      </>
    );
  }

  return null;
};
