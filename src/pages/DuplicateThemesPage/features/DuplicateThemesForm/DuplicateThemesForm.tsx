import { duplicateThemeSchema } from '@entities/theme';
import { SelectClass } from '@features/SelectClass';
import { SelectSubject } from '@features/SelectSubject';
import { createForm } from '@shared/helpers';

export const DuplicateThemesForm = createForm(duplicateThemeSchema, {
  originalClass: (props) => <SelectClass {...props} label="Выбранный класс" />,
  subject: (props) => <SelectSubject {...props} label="Выбранный предмет" />,
  newClass: (props) => <SelectClass {...props} label="Целевой класс" />,
});
