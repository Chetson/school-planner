import { api, apiUrls, createApiFn } from '@shared/api';

import type {
  DeleteColumnPayload,
  DeleteGradePayload,
  ModifyColumnPayload,
  ModifyGradePayload,
  ModifyPresencePayload,
  ModifyThemePayload,
} from './types';

export const gradeModifyMutationFn = createApiFn<void, ModifyGradePayload>(
  ({ lessonId, studentId, activityId, score }) =>
    api.patch(apiUrls.GRADEBOOK.MODIFY_GRADE(lessonId), {
      studentId,
      activityId,
      score: score?.score,
    }),
);

export const gradeDeleteMutationFn = createApiFn<void, DeleteGradePayload>(
  ({ lessonId, studentId, activityId }) =>
    api.delete(apiUrls.GRADEBOOK.DELETE_GRADE(lessonId), {
      data: {
        studentId,
        activityId,
      },
    }),
);

export const presenceMutationFn = createApiFn<void, ModifyPresencePayload>(
  ({ lessonId, studentId, presence, comment }) =>
    api.patch(apiUrls.GRADEBOOK.MODIFY_PRESENCE(lessonId), {
      studentId,
      presence,
      comment,
    }),
);

export const columnModifyMutationFn = createApiFn<void, ModifyColumnPayload>(
  ({ lessonId, activityId, info }) =>
    api.patch(apiUrls.GRADEBOOK.MODIFY_COLUMN(lessonId), {
      activityId,
      info,
    }),
);

export const columnDeleteMutationFn = createApiFn<void, DeleteColumnPayload>(
  ({ lessonId, activityId }) =>
    api.delete(apiUrls.GRADEBOOK.DELETE_COLUMN(lessonId), {
      data: {
        activityId,
      },
    }),
);

export const themeModifyMutationFn = createApiFn<void, ModifyThemePayload>(
  ({ lessonId, theme }) =>
    api.patch(apiUrls.GRADEBOOK.MODIFY_THEME(lessonId), { theme }),
);
