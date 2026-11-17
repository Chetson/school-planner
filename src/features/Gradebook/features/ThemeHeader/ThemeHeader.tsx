import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { themeModifyMutationFn } from '@entities/gradebook';
import { useToggle, useUpdate } from '@shared/helpers';

import { schema } from './lib/schema';
import { ThemeHeaderBase } from './ThemeHeaderBase';
import { useGradebookActions } from '../../lib';
import { TextArea } from '../../ui';

import type { FC } from 'react';

export type ThemeHeaderProps = {
  theme?: string | null;
  lessonId: number;
};

export const ThemeHeaderReadonly: FC<ThemeHeaderProps> = ({ theme }) => (
  <ThemeHeaderBase theme={theme} />
);

export const ThemeHeaderEdit: FC<ThemeHeaderProps> = ({
  theme: externalTheme,
  lessonId,
}) => {
  const [active, { open, close }] = useToggle();

  const [theme, setTheme] = useState(externalTheme ?? '');
  const { modifyTheme } = useGradebookActions();

  const { mutateAsync } = useMutation({
    mutationFn: themeModifyMutationFn,
  });

  const handleBlur = async () => {
    close();

    if (externalTheme === theme) return;

    try {
      await mutateAsync({ lessonId, theme });
      modifyTheme?.({ lessonId, theme });
    } catch (err) {
      console.error(err);
    }
  };

  useUpdate(() => setTheme(externalTheme ?? ''), [externalTheme]);

  if (active) {
    return (
      <TextArea
        schema={schema}
        className="!font-normal !text-sm text-text-default text-nowrap"
        value={theme}
        onChange={setTheme}
        onBlur={handleBlur}
      />
    );
  }

  return <ThemeHeaderBase theme={theme} onActive={open} />;
};
