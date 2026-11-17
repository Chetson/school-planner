import { memo } from 'react';

import clsx from 'clsx';
import { isWithinInterval } from 'date-fns';

import { applyTimeToDate, parseTimeToFrontFormat } from '@shared/helpers';
import { Typography } from '@shared/ui';

import type { TimeslotInfoModel } from '@entities/settings';
import type { FC } from 'react';

const TimeCell: FC<TimeslotInfoModel & { index?: number }> = ({
  startTime,
  endTime,
  index = 0,
}) => {
  const startDate = applyTimeToDate(startTime);
  const endDate = applyTimeToDate(endTime);
  const isNow = isWithinInterval(new Date(), {
    start: startDate,
    end: endDate,
  });

  const color = isNow ? 'default-inverted' : 'default';

  return (
    <div className="flex justify-between">
      <Typography
        variant="caption1"
        className="px-2 py-1.5 z-10"
        color={isNow ? 'default-inverted' : 'secondary'}
      >
        {index + 1}
      </Typography>
      <div
        className={clsx(
          isNow && 'bg-decorative-blue',
          'absolute top-0 bottom-0 flex flex-col justify-between w-full px-2 py-1.5',
        )}
      >
        <Typography
          variant="regular3"
          color={color}
          className="flex justify-end"
        >
          {parseTimeToFrontFormat(startTime)}
        </Typography>
        <Typography
          variant="regular3"
          color={color}
          className="flex justify-end"
        >
          {parseTimeToFrontFormat(endTime)}
        </Typography>
      </div>
    </div>
  );
};

export default memo(TimeCell);
