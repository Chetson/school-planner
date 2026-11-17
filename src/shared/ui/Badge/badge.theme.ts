import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center h-5.5 rounded-full border uppercase px-2 text-xs font-bold transition-colors',
  {
    variants: {
      color: {
        mint: 'border-transparent bg-decorative-mint text-text-default-inverted hover:bg-opacity-90',
        orange:
          'border-transparent bg-decorative-orange text-text-default-inverted hover:bg-opacity-90',
        pink: 'border-transparent bg-decorative-pink text-text-default hover:bg-opacity-90',
        beige:
          'border-transparent bg-decorative-beige text-text-default hover:bg-opacity-90',
        yellow:
          'border-transparent bg-decorative-yellow text-text-default-inverted hover:bg-opacity-90',
      },
    },
    defaultVariants: {
      color: 'mint',
    },
  },
);
