import type { groupBaseSchema, groupSchema } from './schema';
import type { CommonApiError, ValidationApiError } from '@shared/helpers';
import type { ApiList } from '@shared/types';
import type { z } from 'zod';

export type GroupBaseModel = z.infer<typeof groupBaseSchema>;

export type GroupModel = z.infer<typeof groupSchema>;

export type GroupsListModel = ApiList<GroupModel>;

export interface CreateGroupPayload {
  name: string;
  room?: number | null;
  subject?: number | null;
  teacher: number;
  students: number[];
}

export interface UpdateGroupPayload {
  id: number;
  data: {
    name?: string | null;
    room?: number | null;
    subject?: number | null;
    teacher?: number | null;
    studentAddIds?: number[] | null;
    studentRemoveIds?: number[] | null;
  };
}
export type SaveGroupError = ValidationApiError<GroupModel> | CommonApiError;
