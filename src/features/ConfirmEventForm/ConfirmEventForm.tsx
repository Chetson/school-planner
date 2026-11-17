import { z } from 'zod';

import { CONFIRM_CHANGE_OPTIONS, EventChangeKind } from '@entities/event';
import { createForm } from '@shared/helpers';
import { RadioGroup } from '@shared/ui';

const schema = z.object({ changeType: z.nativeEnum(EventChangeKind) });

export type ConfirmChangeFormData = z.infer<typeof schema>;

export const ConfirmEventForm = createForm(schema, {
  changeType: (props) => (
    <RadioGroup {...props} isClearable={false} data={CONFIRM_CHANGE_OPTIONS} />
  ),
});
