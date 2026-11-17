import { forwardRef, memo, useState } from 'react';

import { SUBJECT_LIST_QUERY_KEYS, subjectsQueryFn } from '@entities/subject';
import { SelectRemote } from '@features/SelectRemote';

import { createDropdownItem, getTitle } from './heplers';

import type { SubjectModel } from '@entities/subject';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

const SelectSubject: ForwardRefRenderFunction<
  HTMLButtonElement,
  MultiselectDropdownRemoteProps<SubjectModel> & SelectInputProps
> = (props, ref) => {
  const [search, setSearch] = useState('');

  return (
    <SelectRemote
      {...props}
      ref={ref}
      withSearch
      searchText={search}
      getTitle={getTitle}
      queryKey={SUBJECT_LIST_QUERY_KEYS({ name: search.trim() })}
      queryFn={subjectsQueryFn}
      normalize={createDropdownItem}
      onSearch={setSearch}
    />
  );
};

export default memo(forwardRef(SelectSubject));
