import type { TypographyColor, TypographyVariant } from './types';
import type { ElementType } from 'react';

export const TYPOGRAPHY_KINDS: Record<
  TypographyVariant,
  { className: string; Component: ElementType }
> = {
  h1: {
    className: 'font-semibold text-4xl',
    Component: 'h1',
  },
  h2: {
    className: 'font-semibold text-3xl',
    Component: 'h2',
  },
  h3: {
    className: 'font-semibold text-2xl',
    Component: 'h3',
  },
  accent1: {
    className: 'font-medium text-lg',
    Component: 'p',
  },
  accent2: {
    className: 'font-medium text-base',
    Component: 'p',
  },
  regular1: {
    className: 'font-normal text-lg',
    Component: 'span',
  },
  regular2: {
    className: 'font-normal text-base',
    Component: 'span',
  },
  regular3: {
    className: 'font-normal text-sm',
    Component: 'span',
  },
  caption1: {
    className: 'font-normal text-xs',
    Component: 'small',
  },
  caption2: {
    className: 'font-normal leading-3 text-[11px]',
    Component: 'small',
  },
  tag: {
    className: 'font-bold text-xs uppercase',
    Component: 'b',
  },
};

export const TYPOGRAPHY_COLORS: Record<TypographyColor, string> = {
  default: 'text-text-default',
  secondary: 'text-text-secondary',
  disable: 'text-text-disable',
  'default-inverted': 'text-text-default-inverted',
  'secondary-inverted': 'text-text-secondary-inverted',
  critical: 'text-text-critical',
  'critical-inverted': 'text-decorative-orange',
};
