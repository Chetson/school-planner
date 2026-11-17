import { memo } from 'react';

import { IconKind } from '@shared/helpers';
import { Button, Icon, Typography } from '@shared/ui';

import styles from './FiltersList.module.css';

export interface FiltersListProps<Id> {
  onChange: (id: Id[]) => void;
  items: { id: Id; title: string }[];
}

const FiltersList = <Id extends string>({
  items,
  onChange,
}: FiltersListProps<Id>) => {
  const handleDelete = (deleted: Id) =>
    onChange(
      items.filter((item) => item.id !== deleted).map((item) => item.id),
    );

  const handleReset = () => onChange([]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ id, title }) => (
        <span key={String(id)} className={styles.filter}>
          <Typography variant="regular2">{title}</Typography>
          <button onClick={() => handleDelete(id)}>
            <Icon kind={IconKind.CROSS} className="text-decorative-gray" />
          </button>
        </span>
      ))}
      {items.length ? (
        <Button
          isFullSize={false}
          variant="tertiary"
          size="s"
          onClick={handleReset}
        >
          Сбросить всё
        </Button>
      ) : null}
    </div>
  );
};

export default memo(FiltersList) as typeof FiltersList;
