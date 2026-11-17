import { getFileAcceptHint, getFilesAcceptString } from '@shared/helpers';

export const FILE_ACCEPT_STRING = getFilesAcceptString('csv', 'xls', 'xlsx');
export const FILE_ACCEPT_HINT = getFileAcceptHint('csv', 'xls', 'xlsx');
