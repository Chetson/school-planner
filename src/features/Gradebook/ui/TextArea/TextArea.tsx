import { useEffect, useRef } from 'react';

import clsx from 'clsx';

import type { ChangeEvent, KeyboardEvent, TextareaHTMLAttributes } from 'react';
import type { z } from 'zod';

export type TextAreaProps<
  Schema extends z.Schema,
  Value extends z.infer<Schema>,
> = {
  schema?: z.Schema;
  onChange: (value: Value) => void;
  value: Value;
  withFocusOnMount?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>;

export const TextArea = <
  Schema extends z.Schema,
  Value extends z.infer<Schema>,
>({
  className,
  value,
  schema,
  onChange,
  withFocusOnMount,
  ...props
}: TextAreaProps<Schema, Value>) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (schema) {
      const { success, data } = schema.safeParse(e.target.value);
      if (success) {
        onChange(data);
      }
    } else {
      onChange(e.target.value as Value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  useEffect(() => {
    const length = String(value).length;
    ref.current?.setSelectionRange(length, length);
    if (withFocusOnMount) {
      ref.current?.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      value={value || ''}
      ref={ref}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      className={clsx(
        className,
        'w-full h-full bg-transparent box-border font-normal caret-decorative-mint border border-decorative-mint rounded-md px-2 py-1.5 outline-none text-xs resize-none overflow-hidden',
      )}
    />
  );
};
