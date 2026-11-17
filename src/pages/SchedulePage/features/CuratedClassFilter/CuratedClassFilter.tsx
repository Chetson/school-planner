import { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { Button, Dropdown, SwitchIcon, Typography } from '@shared/ui';

import { createDropdownItem } from './lib/helpers';
import { useCuratedClassFilter } from './lib/hooks';

import type { ClassDropdownItemType } from './lib/types';
import type { TeacherModel } from '@entities/user';
import type { FC } from 'react';

export type CuratedClassFilterProps = {
  teacher: TeacherModel;
};

const CuratedClassFilter: FC<CuratedClassFilterProps> = ({ teacher }) => {
  const [cls, setClass] = useCuratedClassFilter();

  const [opened, setOpened] = useState(false);

  const { curatedClasses, isCurator } = teacher.extra;

  const options = useMemo(
    () => curatedClasses.map(createDropdownItem),
    [curatedClasses],
  );

  const value = useMemo(() => (cls ? createDropdownItem(cls) : null), [cls]);

  const handleChange = useCallback(
    (option: ClassDropdownItemType | null) => setClass(option?.value ?? null),
    [setClass],
  );

  useLayoutEffect(() => {
    const [curatedClass] = curatedClasses;
    if (curatedClass) setClass(curatedClass);
  }, [curatedClasses]);

  if (!isCurator) return null;

  return (
    <Dropdown
      onOpenChange={setOpened}
      items={options}
      value={value}
      onChange={handleChange}
    >
      <Dropdown.Trigger asChild>
        <Button
          className="w-36"
          isFullSize={false}
          variant="blank"
          rightElement={<SwitchIcon opened={opened} />}
        >
          <Typography className="truncate" variant="regular3" color="secondary">
            {cls ? cls.className : 'Класс'}
          </Typography>
        </Button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};

export default memo(CuratedClassFilter);
