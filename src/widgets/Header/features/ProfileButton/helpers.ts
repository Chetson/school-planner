import { CURRENT_USER_QUERY_KEYS } from '@entities/user';
import { apiService, queryClient } from '@shared/api';

export const logout = () => {
  apiService.clearTokens();
  queryClient.setQueryData(CURRENT_USER_QUERY_KEYS, () => null);
  sessionStorage.clear();
};
