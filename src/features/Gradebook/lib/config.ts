import {
  ActivityHeaderEdit,
  ActivityHeaderReadonly,
  CommentCellEdit,
  CommentCellRedonly,
  GradeCellEdit,
  GradeCellReadonly,
  PresenceCellEdit,
  PresenceCellReadonly,
  PresenceHeaderEdit,
  PresenceHeaderReadonly,
  ThemeHeaderEdit,
  ThemeHeaderReadonly,
} from '../features';

import type { GradebookComponents } from './types';

export const EDITABLE_COMPONENTS: GradebookComponents = {
  PresenceCell: PresenceCellEdit,
  GradeCell: GradeCellEdit,
  CommentCell: CommentCellEdit,
  ActivityHeader: ActivityHeaderEdit,
  PresenceHeader: PresenceHeaderEdit,
  ThemeHeader: ThemeHeaderEdit,
};

export const READONLY_COMPONENTS: GradebookComponents = {
  PresenceCell: PresenceCellReadonly,
  GradeCell: GradeCellReadonly,
  CommentCell: CommentCellRedonly,
  ActivityHeader: ActivityHeaderReadonly,
  PresenceHeader: PresenceHeaderReadonly,
  ThemeHeader: ThemeHeaderReadonly,
};
