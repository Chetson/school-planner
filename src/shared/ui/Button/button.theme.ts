import { cva } from 'class-variance-authority';

import styles from './button.module.css';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap normal-case text-base font-medium gap-2 transition ease-in-out duration-200',
  {
    variants: {
      variant: {
        primary: styles.primary,
        secondary: styles.secondary,
        tertiary: styles.tertiary,
        destructive: styles.destructive,
        link: styles.link,
        blank: styles.blank,
      },
      size: {
        s: 'h-11 rounded-xl px-4',
        m: 'h-13 rounded-2xl px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'm',
    },
  },
);
