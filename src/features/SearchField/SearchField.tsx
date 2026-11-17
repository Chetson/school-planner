import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { IconKind } from '@shared/helpers';
import { Input } from '@shared/ui';

import { useSearchTextInternal, useSearchVisible } from './hooks';

export const SearchField = () => {
  const { isVisible } = useSearchVisible();

  const [search, onChangeSearch] = useSearchTextInternal();
  const [value, setValue] = useState(search);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChangeSearch(event.target.value);
  };

  useEffect(() => setValue(search), [search]);

  if (!isVisible) {
    return null;
  }

  return (
    <Input
      value={value}
      onChange={handleChange}
      variant="transparent"
      placeholder="Поиск"
      leftElement={IconKind.SEARCH}
      containerClassName="bg-bg-default"
    />
  );
};
