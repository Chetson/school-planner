import type { ClassBaseModel } from '@entities/class';
import type { SubjectBaseModel } from '@entities/subject';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';

export type ThemeModel = {
  id: number;
  themeClass: ClassBaseModel;
  subject: SubjectBaseModel;
  name: string;
  totalHours: number;
  lessonDate: string[];
};

export type ThemesModel = ApiList<ThemeModel>;

export type SaveThemePayload = {
  classId: number;
  subjectId: number;
  name: string;
  totalHours: number;
};

export type CreateThemesPayload = {
  data: SaveThemePayload[];
};

export type UpdateThemePayload = {
  id: number;
  data: SaveThemePayload;
};

export type UploadThemesPayload = {
  subjectId: number;
  classId: number;
  file: File;
};

export type MoveThemePaylod = {
  themeId: number;
  action: 'raise' | 'lower';
};

export type UploadedFailedThemeModel = {
  lessonThemeData: SaveThemePayload;
};

export type UploadedThemes = {
  successfull: SaveThemePayload[];
  failed: UploadedFailedThemeModel[];
};

export type DuplicateThemesPayload = {
  originalClassId: number;
  newClassId: number;
  subjectId: number;
};

export type SaveThemeError =
  | CommonApiError
  | ValidationApiError<SaveThemePayload>;

export type DuplicateThemesError =
  | CommonApiError
  | ValidationApiError<DuplicateThemesPayload>;
