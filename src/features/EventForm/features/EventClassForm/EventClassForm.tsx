import { Role } from '@entities/user';
import { eventClassSchema } from '@features/EventForm/lib';
import { SelectClass } from '@features/SelectClass';
import { SelectRoom } from '@features/SelectRoom';
import { SelectSubject } from '@features/SelectSubject';
import { SelectTimeslot } from '@features/SelectTimeslot';
import { SelectUser } from '@features/SelectUser';
import { createForm } from '@shared/helpers';
import { Input, RadioGroup } from '@shared/ui';

import { EVENT_TYPE_OPTIONS, PERIOD_OPTIONS } from '../../lib';
import { CustomDatePicker } from '../CustomDatePicker';

export const EventClassForm = createForm(eventClassSchema, {
  groupClass: (props) => <SelectClass {...props} label="Класс" />,
  room: (props) => <SelectRoom {...props} label="Кабинет" />,
  teacher: (props) => (
    <SelectUser role={Role.TEACHER} {...props} label="Учитель" />
  ),
  subject: (props) => <SelectSubject {...props} label="Предмет" />,
  range: (props) => <CustomDatePicker {...props} />,
  timeslot: (props) => (
    <SelectTimeslot {...props} label="Время" anchorClassName="flex-1" />
  ),
  comment: (props) => (
    <Input
      {...props}
      label="Комментарий"
      caption={props.caption || 'Максимум 256 символов'}
    />
  ),
  period: (props) => (
    <RadioGroup {...props} data={PERIOD_OPTIONS} className="flex-1" />
  ),
  eventType: (props) => (
    <RadioGroup {...props} data={EVENT_TYPE_OPTIONS} className="flex-1" />
  ),
});
