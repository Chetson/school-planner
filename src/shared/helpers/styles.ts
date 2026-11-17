import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function rem(value: number | string): string;
export function rem(
  topBottom: number | string,
  rightLeft: number | string,
): string;
export function rem(
  top: number | string,
  rightLeft: number | string,
  bottom: number | string,
): string;
export function rem(
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
): string;

export function rem(...args: (number | string)[]) {
  return args
    .map((unit) => (typeof unit === 'number' ? `${unit / 16}rem` : unit))
    .join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
