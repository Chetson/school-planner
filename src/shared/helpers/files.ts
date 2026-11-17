export type FileAcceptType =
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'csv'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'rtf'
  | 'txt'
  | 'images'
  | 'gif'
  | 'tif'
  | 'jpeg'
  | 'pjpeg'
  | 'png'
  | 'bmp'
  | 'rar'
  | 'zip'
  | 'sevenz'
  | 'msg'
  | 'psd';

export const FILE_MIME_TYPES: Record<FileAcceptType, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  csv: 'text/csv',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.oasis.opendocument.text',
  pptx: 'application/vnd.ms-powerpoint',
  rtf: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'application/rtf',
  images: 'text/plain',
  gif: 'image/gif',
  tif: 'image/tiff',
  jpeg: 'image/jpeg',
  pjpeg: 'image/pjpeg',
  png: 'image/png',
  bmp: 'image/bmp',
  rar: 'application/vnd.rar',
  zip: 'application/zip',
  sevenz: 'application/x-7z-compressed',
  msg: 'application/vnd.ms-outlook',
  psd: 'image/vnd.adobe.photoshop',
};

export const getFilesAcceptString = (...fileKinds: FileAcceptType[]) =>
  fileKinds.map((kind) => FILE_MIME_TYPES[kind]).join();

export const getFileAcceptHint = (...fileKinds: FileAcceptType[]) => {
  if (!fileKinds.length) return '';

  return 'Формат файла должен быть ' + fileKinds.join(', ');
};
