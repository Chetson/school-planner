import { userBaseSchema } from '@entities/user';
import { useFilter } from '@shared/helpers';

export const useChildFilter = () => useFilter('child', userBaseSchema);
