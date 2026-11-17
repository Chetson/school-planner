import type { ActivityModel } from '@entities/activity';
import type { SubjectBaseModel } from '@entities/subject';
import type { UserBaseModel } from '@entities/user';

export enum Presence {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  ABSENT_REASONS = 'ABSENT_REASONS',
  ABSENT_SICK = 'ABSENT_SICK',
}

export type ScoreModel = Record<number, { score: number } | null>;

export type TotalScoreModel = Record<number, number>;

export type GradebookActivityModel = {
  activity: ActivityModel;
  comment?: string;
};

export type GradebookStudentModel = {
  student: UserBaseModel;
  presence?: Presence;
  scores: ScoreModel;
  comment?: string;
  canEdit: boolean;
};

export type GradebookSubjectModel = {
  subject: SubjectBaseModel;
  presence?: Presence;
  scores: ScoreModel;
  comment?: string;
  theme?: string | null;
};

export type GradebookLessonModel<RowsModel = object> = {
  id: number;
  eventDate: string;
  activities: GradebookActivityModel[];
} & RowsModel;

export type GradebookRawModel<LessonModel extends GradebookLessonModel> = {
  quarter: number;
  teacher?: UserBaseModel;
  totalScore: TotalScoreModel;
  dates: LessonModel[];
};

export type GradebookLessonStudentListModel = GradebookLessonModel<{
  studentList: GradebookStudentModel[];
  theme?: string | null;
}>;

export type GradebookLessonSubjectListModel = GradebookLessonModel<{
  subjectList: GradebookSubjectModel[];
}>;

export type GradebookStudentListModel =
  GradebookRawModel<GradebookLessonStudentListModel>;

export type GradebookSubjectListModel =
  GradebookRawModel<GradebookLessonSubjectListModel>;

export type ModifyGradePayload = {
  lessonId: number;
  activityId: number;
  studentId: number;
  score: { score: number } | null;
};

export type DeleteGradePayload = {
  lessonId: number;
  activityId: number;
  studentId: number;
};

export type ModifyPresencePayload = {
  lessonId: number;
  studentId: number;
  presence?: Presence;
  comment?: string;
};

export type ModifyColumnPayload = {
  lessonId: number;
  activityId: number;
  info?: string;
};

export type DeleteColumnPayload = {
  lessonId: number;
  activityId: number;
};

export type ModifyThemePayload = {
  lessonId: number;
  theme: string;
};
