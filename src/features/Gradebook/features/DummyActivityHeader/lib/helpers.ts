import type { ActivityDropdownItem } from './types';
import type { ActivityModel } from '@entities/activity';

export const createActivityDropdownItem = (
  activity: ActivityModel,
): ActivityDropdownItem => ({
  id: activity.id,
  title: activity.name,
  activity,
});
