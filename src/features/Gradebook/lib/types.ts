import type {
  ActivityHeaderProps,
  CommentCellProps,
  GradeCellProps,
  PresenceCellProps,
  PresenceHeaderProps,
  ThemeHeaderProps,
} from '../features';
import type {
  GradebookActivityModel,
  GradebookStudentModel,
  ModifyGradePayload,
  ModifyPresencePayload,
  ModifyThemePayload,
  Presence,
  ScoreModel,
} from '@entities/gradebook';
import type { ColumnHelper } from '@tanstack/react-table';
import type { ComponentType, RefObject } from 'react';

export enum TableAccessorKey {
  STUDENTS = 'students',
  SUBJECTS = 'subjects',
  TOTAL_SCORES = 'total_scores',
  TOTAL_SCORE = 'total_score',
  TOTAL_SCORE_GROUP = 'total_score_group',
  TEACHER = 'teacher',
  CLASS = 'class',
  PRESENCE = 'presence',
  THEME = 'theme',
  COMMENT = 'comment',
  DUMMY_ACTIVITY = 'dummy_activity',
  LESSON_SUMMARY = 'lesson_summary',
}

export type ModifyActivityType = (
  lessonId: number,
  activity: GradebookActivityModel,
) => void;

export type DeleteActivityType = (lessonId: number, activityId: number) => void;
export type AddDummyActivityType = (lessonId: number) => void;
export type DeleteDummyActivityType = (lessonId: number) => void;
export type ModifyGradeType = (params: ModifyGradePayload) => void;
export type ModifyPresenceType = (params: ModifyPresencePayload) => void;
export type ModifyThemeType = (params: ModifyThemePayload) => void;

export type GradebookColumnHelper = ColumnHelper<GradebookStudentModel>;

export type GradebookRowData = {
  date: string;
  comment?: string;
  presence?: Presence;
  scores: ScoreModel;
  theme?: string | null;
};

export type GradebookRow = {
  id: number;
  title: string;
  data: Record<number, GradebookRowData>;
  total: number;
  canEdit?: boolean;
};

export type GradebookComponents = {
  PresenceCell: ComponentType<PresenceCellProps>;
  GradeCell: ComponentType<GradeCellProps>;
  CommentCell: ComponentType<CommentCellProps>;
  ActivityHeader: ComponentType<ActivityHeaderProps>;
  PresenceHeader: ComponentType<PresenceHeaderProps>;
  ThemeHeader: ComponentType<ThemeHeaderProps>;
};

export type DummyActivities = Set<number>;

export type LessonHandlers = {
  focus: VoidFunction;
  blur: VoidFunction;
};

export type LessonRef = RefObject<LessonHandlers>;
