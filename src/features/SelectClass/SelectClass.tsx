import { forwardRef, memo, useState } from 'react';

import { CLASSES_LIST_QUERY_KEYS, classesQueryFn } from '@entities/class';
import { SelectRemote } from '@features/SelectRemote';

import { createDropdownItem, getTitle } from './lib/helpers';

import type { ClassModel } from '@entities/class';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

const SelectClass: ForwardRefRenderFunction<
  HTMLButtonElement,
  MultiselectDropdownRemoteProps<ClassModel> & SelectInputProps
> = (props, ref) => {
  const [search, setSearch] = useState('');

  return (
    <SelectRemote
      {...props}
      ref={ref}
      withSearch
      searchText={search}
      getTitle={getTitle}
      queryKey={CLASSES_LIST_QUERY_KEYS({ search: search.trim() })}
      queryFn={classesQueryFn}
      normalize={createDropdownItem}
      onSearch={setSearch}
    />
  );
};

export default memo(forwardRef(SelectClass));
