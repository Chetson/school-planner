import { memo } from 'react';

import { Link } from 'react-router-dom';

import { FiltersSelect } from '@features/FiltersSelect';
import { IconKind } from '@shared/helpers';
import { PAGES } from '@shared/helpers';
import { Button } from '@shared/ui';

import { filterOptions } from './config.ts';

import type { DropdownRole } from '@pages/UsersPage';
import type { DropdownItemType } from '@shared/ui';
import type { FC } from 'react';

export interface UsersToolbarProps {
  selectedFilters: DropdownItemType<DropdownRole>[];
  onFiltersChange: (filters: DropdownRole[]) => void;
}

const UsersToolbar: FC<UsersToolbarProps> = ({
  selectedFilters,
  onFiltersChange,
}) => {
  const handleSelectFilters = (items: DropdownItemType<DropdownRole>[]) =>
    onFiltersChange(items.map((item) => item.id));

  return (
    <>
      <FiltersSelect
        title="Роли"
        options={[...filterOptions, { id: 'CURATOR', title: 'Куратор' }]}
        value={selectedFilters}
        onChange={handleSelectFilters}
      />
      <div className="space-x-4">
        <Link to={PAGES.CREATE_USER.mask}>
          <Button
            isFullSize={false}
            variant="primary"
            leftElement={IconKind.USER_ADD}
          >
            Добавить
          </Button>
        </Link>

        <Link to={PAGES.UPLOAD_USERS.mask}>
          <Button
            isFullSize={false}
            variant="secondary"
            leftElement={IconKind.DOWNLOAD}
          >
            Загрузить
          </Button>
        </Link>
      </div>
    </>
  );
};

export default memo(UsersToolbar);
