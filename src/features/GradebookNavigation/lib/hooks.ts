import { useLocation } from 'react-router-dom';
import { z } from 'zod';

import { PAGES, useQueryParams } from '@shared/helpers';

import { GradebookTeacherView } from './config';

const viewSchema = z.object({
  view: z.array(z.nativeEnum(GradebookTeacherView)).optional(),
});

export const useGradebookTeacherView = (): GradebookTeacherView | null => {
  const { queryParams } = useQueryParams(viewSchema);
  const location = useLocation();
  const [view = GradebookTeacherView.COMMON_GRADEBOOK] = queryParams.view || [];

  if (location.pathname === PAGES.JOURNAL_DETAILS.mask) {
    return view;
  }

  return null;
};
