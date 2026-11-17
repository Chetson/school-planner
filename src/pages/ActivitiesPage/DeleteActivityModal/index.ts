import { deleteActivityMutationFn } from '@entities/activity/mutations';
import { IconKind } from '@shared/helpers';
import { createOperationModal } from '@widgets/OperationModal';

export const DeleteActivityModal = createOperationModal({
  mutationFn: deleteActivityMutationFn,
  meta: (activity) => ({
    icon: IconKind.DELETE_ILLUSTRATION,
    title: 'Удалить вид деятельности',
    description: `Вы действительно хотите удалить вид деятельности ${activity.name}?`,
    actionText: 'Удалить',
  }),
});
