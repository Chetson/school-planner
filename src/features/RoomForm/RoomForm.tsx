import { roomSchema } from '@entities/room';
import { Role } from '@entities/user';
import { SelectUser } from '@features/SelectUser';
import { createForm } from '@shared/helpers';
import { Input } from '@shared/ui';

import { SelectClass } from '../SelectClass';

import type { z } from 'zod';

export const roomFormSchema = roomSchema.omit({ id: true });

export type RoomFormData = z.infer<typeof roomFormSchema>;

export const RoomForm = createForm(roomFormSchema, {
  roomName: (props) => <Input {...props} label="Номер кабинета" />,
  basedClass: (props) => (
    <SelectClass
      {...props}
      label="Класс"
      caption={
        props.caption ||
        (props.value?.baseClassroom
          ? `Класс уже имеет базовый кабинет ${props.value.baseClassroom.roomName}`
          : '')
      }
    />
  ),
  staff: (props) => (
    <SelectUser {...props} isMultiselect role={Role.TEACHER} label="Учителя" />
  ),
});
