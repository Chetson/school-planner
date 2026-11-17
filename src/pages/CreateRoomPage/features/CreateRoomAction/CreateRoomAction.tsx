import type { FC } from 'react';

import { Button } from '@shared/ui';
import { useFormContext } from 'react-hook-form';

export interface CreateRoomActionProps {
  isLoading: boolean;
}

export const CreateRoomAction: FC<CreateRoomActionProps> = ({ isLoading }) => {
  const {
    formState: { isValid, isSubmitted },
  } = useFormContext();

  return (
    <Button
      isLoading={isLoading}
      disabled={!isValid && isSubmitted}
      type="submit"
    >
      Добавить
    </Button>
  );
};
