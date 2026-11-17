import type { GradebookModifier } from './types';
import type {
  GradebookActivityModel,
  ModifyGradePayload,
  ModifyPresencePayload,
  ModifyThemePayload,
} from '@entities/gradebook';

export const getModifyActivity =
  (lessonId: number, activity: GradebookActivityModel): GradebookModifier =>
  (data) => {
    const dates = data.dates.map((date) => {
      if (date.id !== lessonId) return date;

      const activityIndex = date.activities.findIndex(
        ({ activity: { id } }) => id === activity.activity.id,
      );

      const activities =
        activityIndex === -1
          ? [...date.activities, activity]
          : date.activities.map((act, idx) =>
              idx === activityIndex ? activity : act,
            );

      return { ...date, activities };
    });

    return { ...data, dates };
  };

export const getDeleteActivity =
  (lessonId: number, activityId: number): GradebookModifier =>
  (data) => {
    const dates = data.dates.map((date) => {
      if (date.id === lessonId) {
        const activities = date.activities.filter(
          ({ activity: { id } }) => id !== activityId,
        );

        return { ...date, activities };
      }

      return date;
    });

    return { ...data, dates };
  };

export const getModifyGrade =
  ({
    lessonId,
    studentId,
    activityId,
    score,
  }: ModifyGradePayload): GradebookModifier =>
  (data) => {
    const dates = data.dates.map((date) => {
      if (date.id !== lessonId) return date;

      const studentList = date.studentList.map((student) => {
        if (student.student.id !== studentId) return student;

        return {
          ...student,
          scores: {
            ...student.scores,
            [activityId]: score,
          },
        };
      });

      return { ...date, studentList };
    });

    return { ...data, dates };
  };

export const getModifyTheme =
  ({ lessonId, theme }: ModifyThemePayload): GradebookModifier =>
  (data) => {
    const dates = data.dates.map((date) => {
      if (date.id !== lessonId) return date;

      return { ...date, theme };
    });

    return { ...data, dates };
  };

export const getModifyPresence =
  ({
    lessonId,
    studentId,
    ...rest
  }: ModifyPresencePayload): GradebookModifier =>
  (data) => {
    const dates = data.dates.map((date) => {
      if (date.id !== lessonId) return date;

      const studentList = date.studentList.map((student) => {
        if (student.student.id !== studentId) return student;

        return {
          ...student,
          ...rest,
        };
      });

      return { ...date, studentList };
    });

    return { ...data, dates };
  };
