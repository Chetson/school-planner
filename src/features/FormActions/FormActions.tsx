import { useFormContext } from 'react-hook-form';

import { Button } from '@shared/ui';

import type { FC } from 'react';

export interface FormActionsProps {
  isLoading?: boolean;
  onCancel?: VoidFunction;
  submitButtonText?: string;
}

export const FormActions: FC<FormActionsProps> = ({
  isLoading,
  onCancel,
  submitButtonText = 'Сохранить',
}) => {
  const {
    formState: { isValid, isSubmitted },
  } = useFormContext();

  return (
    <>
      {onCancel && (
        <Button
          onClick={onCancel}
          disabled={isLoading}
          variant="tertiary"
          type="button"
        >
          Отменить
        </Button>
      )}
      <Button
        isLoading={isLoading}
        disabled={!isValid && isSubmitted}
        type="submit"
      >
        {submitButtonText}
      </Button>
    </>
  );
};
