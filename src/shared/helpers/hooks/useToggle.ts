import { useCallback, useMemo, useState } from 'react';

export interface ToggleActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpened: (opened: boolean) => void;
}

export function useToggle(
  defaultValue = false,
): [value: boolean, actions: ToggleActions] {
  const [opened, setOpened] = useState(defaultValue);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const toggle = useCallback(() => {
    setOpened((v) => !v);
  }, []);

  const actions = useMemo(() => ({ open, close, toggle, setOpened }), []);

  return [opened, actions];
}
