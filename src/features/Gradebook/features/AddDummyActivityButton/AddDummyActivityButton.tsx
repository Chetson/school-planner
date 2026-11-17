import { useGradebookActions } from '@features/Gradebook/lib';
import { AddButton } from '@features/Gradebook/ui';

import type { FC } from 'react';

export const AddDummyActivityButton: FC<{ lessonId: number }> = ({
  lessonId,
}) => {
  const { addDummyActivity } = useGradebookActions();

  return <AddButton onClick={() => addDummyActivity?.(lessonId)} />;
};
