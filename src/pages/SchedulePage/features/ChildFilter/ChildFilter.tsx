import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  Role,
  useCurrentUser,
  USERS_LIST_QUERY_KEYS,
  usersQueryFn,
} from '@entities/user';
import { getStudentName } from '@shared/helpers';
import { SortDirection } from '@shared/types';
import { Button, Dropdown, SwitchIcon, Typography } from '@shared/ui';

import { createDropdownItem } from './lib/helpers';
import { useChildFilter } from './lib/hooks';

import type { ChildDropdownItemType } from './lib/types';

export const ChildFilter = () => {
  const [child, setChild] = useChildFilter();
  const { data: currentUser } = useCurrentUser();
  const [opened, setOpened] = useState(false);

  // TODO Временное решение пока не появится возможность
  // получать детей через extra у родителя
  const { data } = useQuery({
    queryFn: usersQueryFn,
    refetchOnMount: false,
    staleTime: Infinity,
    queryKey: USERS_LIST_QUERY_KEYS({
      role: [Role.STUDENT],
      sortId: 'name',
      sortDir: SortDirection.ASC,
      isBlocked: false,
      parentId: currentUser?.id,
    }),
  });

  const options = useMemo(
    () => (data?.results || []).map(createDropdownItem),
    [data],
  );

  const value = useMemo(
    () => (child ? createDropdownItem(child) : null),
    [child],
  );

  const handleChange = useCallback(
    (option: ChildDropdownItemType | null) => setChild(option?.value ?? null),
    [setChild],
  );

  useLayoutEffect(() => {
    if (!child) setChild(data?.results[0] ?? null);
  }, [data, child]);

  if ((data?.count ?? 0) < 2) return null;

  return (
    <Dropdown
      popoverClassName="!w-72"
      onOpenChange={setOpened}
      items={options}
      value={value}
      onChange={handleChange}
    >
      <Dropdown.Trigger asChild>
        <Button
          className="w-60"
          isFullSize={false}
          variant="blank"
          rightElement={<SwitchIcon opened={opened} />}
        >
          <Typography className="truncate" variant="regular3" color="secondary">
            {child ? getStudentName(child) : 'Ребёнок'}
          </Typography>
        </Button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};
