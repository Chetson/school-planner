import { memo, useState } from 'react';

import clsx from 'clsx';

import { ROLE_NAMES, useCurrentUser } from '@entities/user';
import { UserAvatar } from '@features/UserAvatar';
import { Button, Dropdown, Typography } from '@shared/ui';
import { SwitchIcon } from '@shared/ui/SwitchIcon';

import { DropdownItemId, ROLE_COLORS, PROFILE_DROPDOWN_ITEMS } from './config';
import { logout } from './helpers';
import styles from './ProfileButton.module.css';

import type { DropdownItemType } from '@shared/ui';
import type { FC } from 'react';

const ProfileButton: FC = () => {
  const { data } = useCurrentUser();

  const [opened, setOpened] = useState(false);

  const handleSelect = (item: DropdownItemType<DropdownItemId> | null) => {
    if (item?.id === DropdownItemId.LOGOUT) {
      logout();
    }
  };

  if (!data) {
    return null;
  }

  const { lastName, firstName, role } = data;

  return (
    <Dropdown
      onOpenChange={setOpened}
      onChange={handleSelect}
      value={null}
      items={PROFILE_DROPDOWN_ITEMS}
    >
      <Dropdown.Trigger asChild>
        <Button
          variant="blank"
          className={styles.button}
          rightElement={
            <SwitchIcon className={clsx(!opened && 'rotate-[-90deg]')} />
          }
        >
          <UserAvatar src="" />

          <div className="flex flex-col items-start min-w-20">
            <Typography
              variant="regular3"
              className="truncate w-full text-left"
            >
              {`${firstName} ${lastName[0]}.`}
            </Typography>
            {role && (
              <span className={clsx(ROLE_COLORS[role], 'text-xs')}>
                {ROLE_NAMES[role]}
              </span>
            )}
          </div>
        </Button>
      </Dropdown.Trigger>
    </Dropdown>
  );
};

export default memo(ProfileButton);
