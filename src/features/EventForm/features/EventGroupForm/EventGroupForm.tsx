import { eventGroupSchema } from '@features/EventForm/lib';
import { SelectGroup } from '@features/SelectGroup';
import { SelectTimeslot } from '@features/SelectTimeslot';
import { createForm } from '@shared/helpers';
import { Input, RadioGroup } from '@shared/ui';

import { EVENT_TYPE_OPTIONS, PERIOD_OPTIONS } from '../../lib';
import { CustomDatePicker } from '../CustomDatePicker';

export const EventGroupForm = createForm(eventGroupSchema, {
  group: (props) => <SelectGroup {...props} label="Группа" />,
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
