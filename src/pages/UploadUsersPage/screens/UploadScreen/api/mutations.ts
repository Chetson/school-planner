import { api, apiUrls, createApiFn } from '@shared/api';

import type { UploadFormData } from '../lib/types';

export const uploadMutationFn = createApiFn<never, UploadFormData>(
  ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.put(apiUrls.USERS.VALIDATE_EXCEL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  {},
);
