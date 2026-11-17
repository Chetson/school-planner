import { useState } from 'react';

import { useToggle, useUpdate } from '@shared/helpers';
import { HoverCard } from '@shared/ui';

import { TextArea } from '../TextArea';

import type { FC, PropsWithChildren } from 'react';

export type TextAreaHoverProps = {
  onEdit?: (text: string) => void;
  text?: string;
  readOnly?: boolean;
  isPending?: boolean;
  triggerClassName?: string;
};

export const TextAreaHover: FC<PropsWithChildren<TextAreaHoverProps>> = ({
  children,
  onEdit,
  text = '',
  readOnly,
  isPending,
  triggerClassName,
}) => {
  const [value, setValue] = useState(text);
  const [opened, { setOpened }] = useToggle();
  const [focused, { open: focus, close: blur }] = useToggle();

  const handleBlur = () => {
    blur();
    if (value !== text) {
      onEdit?.(value);
    }
  };

  useUpdate(() => setValue(text), [text]);

  return (
    <HoverCard
      className="w-60 p-4"
      anchor={children}
      triggerClassName={triggerClassName}
      isOpened={(focused || opened) && !isPending}
      onOpenChange={setOpened}
    >
      <TextArea
        onBlur={handleBlur}
        onFocus={focus}
        value={value}
        onChange={setValue}
        className="!h-21"
        readOnly={readOnly}
      />
    </HoverCard>
  );
};
