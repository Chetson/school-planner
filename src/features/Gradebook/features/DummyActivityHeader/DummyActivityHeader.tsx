import { useMemo, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { ACTIVITIES_QUERY_KEYS, activitiesQueryFn } from '@entities/activity';
import { columnModifyMutationFn } from '@entities/gradebook';
import { Dropdown, Spinner, SwitchIcon, Typography } from '@shared/ui';

import { createActivityDropdownItem } from './lib/helpers';
import { useGradebookActions } from '../../lib';
import { GradebookDropdown, SubHeader } from '../../ui';

import type { ActivityDropdownItem } from './lib/types';
import type { FC } from 'react';

export type DummyActivityHeaderProps = {
  lessonId: number;
};

export const DummyActivityHeader: FC<DummyActivityHeaderProps> = ({
  lessonId,
}) => {
  const { modifyActivity, deleteDummyActivity } = useGradebookActions();

  const [value, setValue] = useState<ActivityDropdownItem | null>(null);
  const [opened, setOpened] = useState(false);

  const { data } = useQuery({
    queryFn: activitiesQueryFn,
    staleTime: Infinity,
    queryKey: ACTIVITIES_QUERY_KEYS({}),
  });

  const options = useMemo<ActivityDropdownItem[]>(
    () => (data?.results || []).map(createActivityDropdownItem),
    [data],
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: columnModifyMutationFn,
  });

  const handleSelectActivity = async (option: ActivityDropdownItem | null) => {
    if (option) {
      try {
        setValue(option);
        const activityId = option.activity.id;
        await mutateAsync({ lessonId, activityId });
        modifyActivity?.(lessonId, { activity: option.activity });
        deleteDummyActivity?.(lessonId);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <GradebookDropdown
      popoverClassName="w-44"
      isAutoWidth={false}
      items={options}
      onChange={handleSelectActivity}
      value={value}
      isOpened={opened}
      onOpenChange={setOpened}
    >
      <SubHeader>
        <Dropdown.Trigger className="h-full flex items-center grow justify-start">
          <Typography variant="caption1" color="secondary">
            {value?.activity.shortname ?? 'В/д'}
          </Typography>
          <SwitchIcon opened={opened} />
        </Dropdown.Trigger>
        <Spinner size={15} className={clsx(!isPending && 'opacity-0')} />
      </SubHeader>
    </GradebookDropdown>
  );
};
