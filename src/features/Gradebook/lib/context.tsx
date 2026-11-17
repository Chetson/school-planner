import { createContext, useContext, useMemo } from 'react';

import type {
  AddDummyActivityType,
  DeleteActivityType,
  DeleteDummyActivityType,
  ModifyActivityType,
  ModifyGradeType,
  ModifyPresenceType,
  ModifyThemeType,
} from './types';
import type { FC, PropsWithChildren } from 'react';

type GradebookActions = {
  modifyActivity?: ModifyActivityType;
  deleteActivity?: DeleteActivityType;
  addDummyActivity?: AddDummyActivityType;
  deleteDummyActivity?: DeleteDummyActivityType;
  modifyGrade?: ModifyGradeType;
  modifyPresence?: ModifyPresenceType;
  modifyTheme?: ModifyThemeType;
};

const GradebookActionsContext = createContext<GradebookActions | null>(null);

export const GradebookActionsProvider: FC<
  PropsWithChildren<GradebookActions>
> = ({
  children,
  modifyActivity,
  deleteActivity,
  addDummyActivity,
  deleteDummyActivity,
  modifyGrade,
  modifyPresence,
  modifyTheme,
}) => {
  const actions = useMemo(
    () => ({
      modifyActivity,
      deleteActivity,
      addDummyActivity,
      deleteDummyActivity,
      modifyGrade,
      modifyPresence,
      modifyTheme,
    }),
    [
      modifyActivity,
      deleteActivity,
      addDummyActivity,
      deleteDummyActivity,
      modifyGrade,
      modifyPresence,
      modifyTheme,
    ],
  );

  return (
    <GradebookActionsContext.Provider value={actions}>
      {children}
    </GradebookActionsContext.Provider>
  );
};

export const useGradebookActions = (): GradebookActions => {
  const actions = useContext(GradebookActionsContext);

  return actions ?? {};
};
