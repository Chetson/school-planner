import { classSchema } from '@entities/class';
import { Role } from '@entities/user';
import { SelectRoom } from '@features/SelectRoom';
import { SelectUser } from '@features/SelectUser';
import { createForm } from '@shared/helpers';
import { Input } from '@shared/ui';

import type { z } from 'zod';

const classFormSchema = classSchema.omit({ id: true });

export type ClassFormData = z.infer<typeof classFormSchema>;

export const ClassForm = createForm(classFormSchema, {
  className: (props) => <Input {...props} label="Название класса" />,
  baseClassroom: (props) => <SelectRoom {...props} label="Кабинет" />,
  curators: (props) => (
    <SelectUser {...props} isMultiselect role={Role.TEACHER} label="Кураторы" />
  ),
  students: (props) => (
    <SelectUser {...props} isMultiselect role={Role.STUDENT} label="Ученики" />
  ),
});
