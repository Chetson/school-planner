import { cva } from 'class-variance-authority';

import styles from './table.module.css';

export const tabelVariants = cva(styles.wrapper, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
