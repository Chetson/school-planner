import { memo } from 'react';

import { SearchIcon } from '@shared/assets';
import { Input } from '@shared/ui/inputs';
import { Spinner } from '@shared/ui/Spinner';

import type { FC } from 'react';

export interface DropdownSearchProps {
  isLoading?: boolean;
  searchText?: string;
  hasItems: boolean;
  onSearch?: (value: string) => void;
}

const DropdownSearch: FC<DropdownSearchProps> = ({
  isLoading,
  searchText,
  hasItems,
  onSearch,
}) => (
  <div className="px-6 py-4">
    <Input
      leftElement={<SearchIcon />}
      rightElement={isLoading && <Spinner />}
      label="Поиск"
      value={searchText}
      onChange={(e) => onSearch?.(e.target.value)}
      caption={!isLoading && !hasItems ? 'Ничего не найдено' : ''}
    />
  </div>
);

export default memo(DropdownSearch);
