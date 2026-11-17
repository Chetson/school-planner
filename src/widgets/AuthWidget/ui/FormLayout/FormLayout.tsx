import type { FC, FormEvent, ReactNode } from 'react';

import { Typography } from '@shared/ui/Typography';

export interface FormLayoutProps {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  controls: ReactNode;
  buttons: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({
  onSubmit,
  controls,
  title,
  buttons,
}) => (
  <form onSubmit={onSubmit} className="w-106 space-y-8 px-6">
    <Typography className="leading-none">{title}</Typography>
    <div className="space-y-4">{controls}</div>
    <div className="space-y-6 flex flex-col items-center">{buttons}</div>
  </form>
);
