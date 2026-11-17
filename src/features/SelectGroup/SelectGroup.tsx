import { forwardRef, memo, useState } from 'react';

import { GROUPS_LIST_QUERY_KEYS, groupsListQueryFn } from '@entities/group';
import { SelectRemote } from '@features/SelectRemote';
import { SortDirection } from '@shared/types';

import { createDropdownItem, getTitle } from './lib/helpers';

import type { GroupModel } from '@entities/group';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

const SelectGroup: ForwardRefRenderFunction<
  HTMLButtonElement,
  MultiselectDropdownRemoteProps<GroupModel> & SelectInputProps
> = (props, ref) => {
  const [search, setSearch] = useState('');

  return (
    <SelectRemote
      {...props}
      ref={ref}
      withSearch
      searchText={search}
      onSearch={setSearch}
      queryFn={groupsListQueryFn}
      getTitle={getTitle}
      normalize={createDropdownItem}
      queryKey={GROUPS_LIST_QUERY_KEYS({
        search,
        sortDir: SortDirection.ASC,
        sortId: 'name',
      })}
    />
  );
};

export default memo(forwardRef(SelectGroup));
