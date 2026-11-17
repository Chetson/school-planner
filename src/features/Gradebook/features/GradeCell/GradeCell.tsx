import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import {
  gradeDeleteMutationFn,
  gradeModifyMutationFn,
} from '@entities/gradebook';
import { ToastKind } from '@entities/toast';
import { ACTIVE_CELL_ID, useGradebookActions } from '@features/Gradebook/lib';
import { useToast } from '@features/ToastContext';
import { useToggle } from '@shared/helpers';

import { schema } from './lib/config';
import { StaticCell, TextArea } from '../../ui';

import type { LessonRef } from '@features/Gradebook/lib';
import type { FC } from 'react';

export type GradeCellProps = {
  score?: number;
  studentId: number;
  activityId: number;
  lessonId: number;
  lessonRef: LessonRef;
};

export const GradeCellReadonly: FC<GradeCellProps> = ({ score }) => (
  <StaticCell>{score}</StaticCell>
);

export const GradeCellEdit: FC<GradeCellProps> = ({
  score: externalScore,
  studentId,
  lessonId,
  activityId,
  lessonRef,
}) => {
  const { modifyGrade } = useGradebookActions();
  const addToast = useToast();

  const [active, { open, close }] = useToggle();

  const [score, setScore] = useState(externalScore);

  const { mutateAsync: mutateModifyAsync } = useMutation({
    mutationFn: gradeModifyMutationFn,
  });

  const { mutateAsync: mutateDeleteAsync } = useMutation({
    mutationFn: gradeDeleteMutationFn,
  });

  const handleBlur = async () => {
    close();
    lessonRef.current?.blur();

    if (score === externalScore) return;

    const payload = {
      studentId,
      activityId,
      lessonId,
      score: score ? { score } : null,
    };

    try {
      if (typeof score === 'number') {
        await mutateModifyAsync(payload);
      } else {
        await mutateDeleteAsync(payload);
      }
      modifyGrade?.(payload);
    } catch (err) {
      addToast('Ошибка! Не удалось сохранить оценку.', ToastKind.ERROR);
    }
  };

  const handleFocus = () => {
    open();
    lessonRef.current?.focus();
  };

  if (active) {
    return (
      <TextArea
        id={ACTIVE_CELL_ID}
        withFocusOnMount
        value={score}
        onChange={setScore}
        onBlur={handleBlur}
        schema={schema}
      />
    );
  }

  return (
    <StaticCell onDoubleClick={handleFocus} className="cursor-text">
      {score}
    </StaticCell>
  );
};
