import { memo } from 'react';

import {
  classBaseSchema,
  CLASSES_LIST_QUERY_KEYS,
  classesQueryFn,
} from '@entities/class';
import { FilterRemote } from '@features/FilterRemote';
import { useFilter } from '@shared/helpers';
import { SortDirection } from '@shared/types';

import type { ClassBaseModel } from '@entities/class';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

const normalize = ({
  className,
  id,
}: ClassBaseModel): DropdownRemoteItemType<number, ClassBaseModel> => ({
  title: className,
  id: id,
  value: { className, id },
});

const queryKey = CLASSES_LIST_QUERY_KEYS({
  sortId: 'class_name',
  sortDir: SortDirection.ASC,
});

export const useClassFilter = () => useFilter('cls', classBaseSchema);

const ClassFilter = () => {
  const [cls, setClass] = useClassFilter();

  return (
    <FilterRemote
      queryKey={queryKey}
      queryFn={classesQueryFn}
      value={cls}
      onChange={setClass}
      normalize={normalize}
    >
      {cls ? cls.className : 'Класс'}
    </FilterRemote>
  );
};

export default memo(ClassFilter);
