import { api, apiUrls, createApiFn } from '@shared/api';
import { parseDateToServerFormat } from '@shared/helpers';

import type { GradebookQueryKeys } from './queryKeys';
import type {
  GradebookStudentListModel,
  GradebookSubjectListModel,
} from './types';

const createGradebookQueryFn = <Data>() =>
  createApiFn<Data, GradebookQueryKeys>(({ queryKey, signal }) => {
    const { from, to, ...filters } = queryKey[1];

    const fromStr = parseDateToServerFormat(from);
    const toStr = parseDateToServerFormat(to);

    return api.get(
      apiUrls.GRADEBOOK.LIST({
        ...filters,
        start: fromStr,
        end: toStr,
      }),
      { signal },
    );
  });

export const gradebookStudentsQueryFn =
  createGradebookQueryFn<GradebookStudentListModel>();
export const gradebookSubjectsQueryFn =
  createGradebookQueryFn<GradebookSubjectListModel>();
