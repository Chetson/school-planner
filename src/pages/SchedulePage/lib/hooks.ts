import { z } from 'zod';

import { useQueryParams } from '@shared/helpers';

import { ScheduleTeacherView } from './types';

const schema = z.object({
  view: z.array(z.nativeEnum(ScheduleTeacherView)).optional(),
});

export const useScheduleTeacherView = (): ScheduleTeacherView => {
  const { queryParams } = useQueryParams(schema);
  const [view = ScheduleTeacherView.MY_SCHEDULE] = queryParams.view || [];

  return view;
};
