import { createForm } from '@shared/helpers';
import { Input } from '@shared/ui';

import { subjectFormData } from './schema';

export const SubjectForm = createForm(subjectFormData, {
  name: (props) => <Input {...props} label="Название предмета" />,
});
