import { SelectClass } from '@features/SelectClass';
import { SelectSubject } from '@features/SelectSubject';
import { createForm } from '@shared/helpers';
import { Input } from '@shared/ui';

import { schema } from './lib/schema';

export const ThemeForm = createForm(schema, {
  cls: (props) => <SelectClass {...props} label="Класс" />,
  subject: (props) => <SelectSubject {...props} label="Предмет" />,
  name: (props) => <Input {...props} label="Тема урока" />,
  totalHours: (props) => (
    <Input
      {...props}
      pattern="[0-9.]*"
      label="Количество часов"
      value={String(props.value ?? '')}
      onChange={(event) => {
        if (/^[0-9.]*$/.test(event.target.value)) {
          props.onChange(event.target.value);
        }
      }}
    />
  ),
});
