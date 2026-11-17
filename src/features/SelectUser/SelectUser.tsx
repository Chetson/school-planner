import { forwardRef, memo, useState } from 'react';

import { USERS_LIST_QUERY_KEYS, usersQueryFn } from '@entities/user';
import { SelectRemote } from '@features/SelectRemote';
import { getLastNameAndInitials } from '@shared/helpers';
import { SortDirection } from '@shared/types';

import { createDropdownItemFromUser } from './lib/helpers';

import type { UserBaseModel, Role } from '@entities/user';
import type { MultiselectDropdownRemoteProps } from '@features/DropdownRemote';
import type { SelectInputProps } from '@shared/ui';
import type { ForwardRefRenderFunction } from 'react';

export type SelectUserProps = {
  role: Role;
} & MultiselectDropdownRemoteProps<UserBaseModel> &
  SelectInputProps;

const SelectUser: ForwardRefRenderFunction<
  HTMLButtonElement,
  SelectUserProps
> = ({ role, ...props }, ref) => {
  const [search, setSearch] = useState('');

  return (
    <SelectRemote
      {...props}
      ref={ref}
      withSearch
      searchText={search}
      getTitle={getLastNameAndInitials}
      queryFn={usersQueryFn}
      normalize={createDropdownItemFromUser}
      onSearch={setSearch}
      queryKey={USERS_LIST_QUERY_KEYS({
        sortId: 'name',
        search: search.trim(),
        role: [role],
        sortDir: SortDirection.ASC,
        isBlocked: false,
      })}
    />
  );
};

export default memo(forwardRef(SelectUser));
