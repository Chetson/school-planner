import { memo } from 'react';

import { HoverCard, Typography } from '@shared/ui';

import { StaticCell } from '../StaticCell';

import type { GradebookActivityModel, ScoreModel } from '@entities/gradebook';
import type { FC } from 'react';

export type LessonSummaryCell = {
  activities: GradebookActivityModel[];
  scores: ScoreModel;
  theme?: string | null;
};

const LessonSummaryCell: FC<LessonSummaryCell> = ({
  scores,
  activities,
  theme,
}) => {
  if (!activities.length) {
    return null;
  }

  const summary = Object.values(scores)
    .map((data) => data?.score)
    .filter(Number.isInteger)
    .join('/');

  return (
    <HoverCard
      className="min-w-48 max-w-60"
      anchor={
        <StaticCell className="text-left">
          <Typography variant="caption1">{summary}</Typography>
        </StaticCell>
      }
    >
      {theme ? (
        <Typography variant="caption1" color="secondary">
          {theme}
        </Typography>
      ) : null}
      <ul className="list-none">
        {activities.map(({ activity }) => (
          <li key={activity.id}>
            <Typography variant="caption1">
              {`${activity.name}${scores[activity.id] ? ` - ${scores[activity.id]?.score}` : ''}`}
            </Typography>
          </li>
        ))}
      </ul>
    </HoverCard>
  );
};

export default memo(LessonSummaryCell);
