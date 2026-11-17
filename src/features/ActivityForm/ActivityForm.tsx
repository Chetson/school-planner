import { z } from 'zod';

import { ACTIVITY_FIELDS, activitySchema } from '@entities/activity';
import { createForm, VALIDATION_ERRORS } from '@shared/helpers';
import { Input } from '@shared/ui';

const schema = activitySchema
  .omit({
    id: true,
    koef: true,
  })
  .extend({
    koef: z
      .any()
      .optional()
      .transform((value) => {
        if (!value) return;

        return Number(value);
      })
      .refine((value) => value !== undefined, {
        message: VALIDATION_ERRORS.REQUIRED,
      })
      .pipe(
        z
          .number({ message: VALIDATION_ERRORS.VALUE })
          .max(10, { message: VALIDATION_ERRORS.MAX_COUNT(10) })
          .min(1, { message: VALIDATION_ERRORS.MIN_COUNT(1) }),
      ),
  });

export type ActivityFormData = z.infer<typeof schema>;

export const ActivityForm = createForm(schema, {
  name: (props) => <Input {...props} label={ACTIVITY_FIELDS.NAME} />,
  shortname: (props) => <Input {...props} label={ACTIVITY_FIELDS.SHORT_NAME} />,
  koef: (props) => (
    <Input
      {...props}
      pattern="[0-9.]*"
      label={ACTIVITY_FIELDS.COEF}
      value={String(props.value ?? '')}
      onChange={(event) => {
        if (/^[0-9.]*$/.test(event.target.value)) {
          props.onChange(event.target.value);
        }
      }}
    />
  ),
});
