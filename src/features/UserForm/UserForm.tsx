import { ROLE_NAMES } from '@entities/user';
import { createForm, omit } from '@shared/helpers';
import { DatePicker, Input, Select } from '@shared/ui';

import { ROLE_OPTIONS } from './lib/config';
import { createUserSchema, editUserSchema } from './lib/schema';

import type { CreateUserData, EditUserData } from './lib/schema';
import type { ControlMap } from '@shared/helpers';

const createControls: ControlMap<CreateUserData> = {
  email: (props) => <Input {...props} label="E-mail" />,
  lastName: (props) => <Input {...props} label="Фамилия" />,
  firstName: (props) => <Input {...props} label="Имя" />,
  patronim: (props) => <Input {...props} label="Отчество" />,
  role: ({ onChange, value, ...props }) => (
    <Select
      {...props}
      value={value ? { id: value, title: ROLE_NAMES[value] } : null}
      onChange={(item) => onChange(item?.id)}
      label="Роль"
      items={ROLE_OPTIONS}
    />
  ),
  birthDate: (props) => <DatePicker {...props} label="Дата рождения" />,
  city: (props) => <Input {...props} label="Город" />,
  phoneNumber: (props) => <Input {...props} label="Телефон" />,
  comment: (props) => (
    <Input
      {...props}
      label="Комментарий"
      caption={props.caption || 'Максимум 500 символов'}
    />
  ),
};

const editControls: ControlMap<EditUserData> = omit(createControls, 'role');

export const CreateUserForm = createForm(createUserSchema, createControls);
export const EditUserForm = createForm(editUserSchema, editControls);
