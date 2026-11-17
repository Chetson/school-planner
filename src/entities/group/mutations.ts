import { api, apiUrls, createApiFn } from '@shared/api';

import type { GroupBaseModel } from './types';

export const deleteGroupMutation = createApiFn<void, GroupBaseModel>(
  ({ id }: GroupBaseModel) => api.delete(apiUrls.GROUPS.GROUP(id)),
);
