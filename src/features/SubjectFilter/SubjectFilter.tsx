import { memo } from 'react';

import {
  SUBJECT_LIST_QUERY_KEYS,
  subjectBaseSchema,
  subjectsQueryFn,
} from '@entities/subject';
import { FilterRemote } from '@features/FilterRemote';
import { useFilter } from '@shared/helpers';
import { SortDirection } from '@shared/types';

import type { SubjectBaseModel } from '@entities/subject';
import type { DropdownRemoteItemType } from '@features/DropdownRemote';

const normalize = ({
  id,
  name,
}: SubjectBaseModel): DropdownRemoteItemType<number, SubjectBaseModel> => ({
  title: name,
  id: id,
  value: { id, name },
});

const queryKey = SUBJECT_LIST_QUERY_KEYS({
  sortId: 'name',
  sortDir: SortDirection.ASC,
});

export const useSubjectFilter = () => useFilter('subject', subjectBaseSchema);

const SubjectFilter = () => {
  const [subject, setSubject] = useSubjectFilter();

  return (
    <FilterRemote
      queryKey={queryKey}
      queryFn={subjectsQueryFn}
      value={subject}
      onChange={setSubject}
      normalize={normalize}
    >
      {subject ? subject.name : 'Предмет'}
    </FilterRemote>
  );
};

export default memo(SubjectFilter);
