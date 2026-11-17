import clsx from 'clsx';

import styles from './weekPicker.module.css';

import type { ClassNames } from 'react-day-picker';

export const weekPickerTheme: Partial<ClassNames> = {
  range_end: clsx(styles['range-end'], 'bg-decorative-beige rounded-r'),
};
