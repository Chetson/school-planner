import { deleteClassMutationFn } from '@entities/class/mutations';
import { IconKind } from '@shared/helpers';
import { createOperationModal } from '@widgets/OperationModal';

export const DeleteClassModal = createOperationModal({
  mutationFn: deleteClassMutationFn,
  meta: (cls) => ({
    icon: IconKind.DELETE_ILLUSTRATION,
    title: 'Удалить класс',
    description: `Вы действительно хотите удалить класс ${cls.className}?`,
    actionText: 'Удалить',
  }),
});
