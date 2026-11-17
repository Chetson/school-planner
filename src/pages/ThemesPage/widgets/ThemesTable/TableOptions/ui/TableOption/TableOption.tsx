import { Icon, Typography } from '@shared/ui';

import type { TableOptionsItemType } from '../../lib';
import type { FC } from 'react';

type TableOption = {
  option: TableOptionsItemType;
  onClick: (option: TableOptionsItemType) => void;
};

export const TableOption: FC<TableOption> = ({ option, onClick }) => (
  <div
    onClick={() => onClick(option)}
    className="text-text-secondary cursor-pointer flex items-center justify-start gap-1 py-1 px-5 hover:bg-bg-secondary"
  >
    <Icon kind={option.icon} size={16} />
    <Typography variant="regular3" color="secondary">
      {option.title}
    </Typography>
  </div>
);
