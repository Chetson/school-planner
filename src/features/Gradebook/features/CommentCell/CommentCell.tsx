import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { presenceMutationFn } from '@entities/gradebook';
import { ToastKind } from '@entities/toast';
import { TextArea } from '@features/Gradebook/ui';
import { useToast } from '@features/ToastContext';
import { useToggle } from '@shared/helpers';

import { CommentCellBase } from './CommentCellBase';
import { schema } from './lib/schema';
import { ACTIVE_CELL_ID, useGradebookActions } from '../../lib';

import type { LessonRef } from '../../lib';
import type { FC } from 'react';

export type CommentCellProps = {
  comment?: string;
  studentId: number;
  lessonId: number;
  lessonRef: LessonRef;
};

export const CommentCellRedonly: FC<CommentCellProps> = ({ comment }) => (
  <CommentCellBase comment={comment} />
);

export const CommentCellEdit: FC<CommentCellProps> = ({
  comment: externalComment,
  studentId,
  lessonId,
  lessonRef,
}) => {
  const [active, { open, close }] = useToggle();

  const [comment, setComment] = useState(externalComment ?? '');
  const { modifyPresence } = useGradebookActions();
  const addToast = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: presenceMutationFn,
  });

  const handleBlur = async () => {
    close();
    lessonRef.current?.blur();

    if ((externalComment ?? '') === comment) return;

    try {
      await mutateAsync({
        studentId,
        lessonId,
        comment,
      });
      modifyPresence?.({
        studentId,
        lessonId,
        comment,
      });
    } catch (err) {
      addToast('Ошибка! Не удалось сохранить комменатрий.', ToastKind.ERROR);
    }
  };

  const handleDoubleClick = () => {
    open();
    lessonRef.current?.focus();
  };

  if (active) {
    return (
      <TextArea
        withFocusOnMount
        id={ACTIVE_CELL_ID}
        schema={schema}
        value={comment}
        onChange={setComment}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <CommentCellBase comment={comment} onDoubleClick={handleDoubleClick} />
  );
};
