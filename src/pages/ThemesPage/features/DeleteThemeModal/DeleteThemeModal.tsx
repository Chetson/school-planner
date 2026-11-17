import { deleteThemeMutationFn } from '@entities/theme/mutations';
import { IconKind } from '@shared/helpers';
import { createOperationModal } from '@widgets/OperationModal';

export const DeleteThemeModal = createOperationModal({
  mutationFn: deleteThemeMutationFn,
  meta: (theme) => ({
    icon: IconKind.DELETE_ILLUSTRATION,
    title: 'Удалить тему урока',
    description: `Вы действительно хотите удалить тему урока ${theme.name}?`,
    actionText: 'Удалить',
  }),
});
