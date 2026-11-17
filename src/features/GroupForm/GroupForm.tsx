import { groupSchema } from '@entities/group';
import { Role } from '@entities/user';
import { SelectRoom } from '@features/SelectRoom';
import { SelectSubject } from '@features/SelectSubject';
import { SelectUser } from '@features/SelectUser';
import { createForm } from '@shared/helpers';
import { Input } from '@shared/ui';

import type { z } from 'zod';

const schema = groupSchema.omit({ id: true, groupClass: true });

export type GroupFormData = z.infer<typeof schema>;

export const GroupForm = createForm(schema, {
  name: (props) => <Input {...props} label="Название группы" />,
  room: (props) => <SelectRoom {...props} label="Кабинет" />,
  subject: (props) => <SelectSubject {...props} label="Предмет" />,
  teacher: (props) => (
    <SelectUser {...props} role={Role.TEACHER} label="Учитель" />
  ),
  students: (props) => (
    <SelectUser {...props} role={Role.STUDENT} isMultiselect label="Ученики" />
  ),
});
