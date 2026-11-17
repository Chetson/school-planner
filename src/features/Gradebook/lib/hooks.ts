import { useCallback, useState } from 'react';

import type {
  AddDummyActivityType,
  DeleteDummyActivityType,
  DummyActivities,
} from './types';

/**
 * Хук для добавления пустых колонок в таблицу — dummyActivities.
 * dummyActivities позволяют выбрать вид активности
 * и удаляются перед добавлением реального вида активности.
 */
export const useDummyActivityies = () => {
  const [dummyActivities, setDummyActivity] = useState<DummyActivities>(
    () => new Set<number>(),
  );

  const addDummyActivity: AddDummyActivityType = useCallback(
    (id) =>
      setDummyActivity(
        (prevActivities) => new Set([...prevActivities.add(id)]),
      ),
    [],
  );

  const deleteDummyActivity: DeleteDummyActivityType = useCallback((id) => {
    setDummyActivity((prevActivities) => {
      prevActivities.delete(id);

      return new Set([...prevActivities]);
    });
  }, []);

  return {
    dummyActivities,
    addDummyActivity,
    deleteDummyActivity,
  };
};
