import type { InputProps } from '@shared/ui/inputs';

export type DatePickerInputProps = Omit<
  InputProps,
  'onChange' | 'onBlur' | 'value' | 'rightElement' | 'leftElement' | 'onSelect'
>;
