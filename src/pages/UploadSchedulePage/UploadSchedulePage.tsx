import { useState } from 'react';

import { Role } from '@entities/user';
import { withRoleAccess } from '@features/withRoleAccess';

import { SaveSchedule } from './features/SaveSchedule/SaveSchedule';
import { UploadForm } from './features/UploadForm';

import type { UploadedEvents } from '@entities/event';

const UploadSchedulePage = () => {
  const [events, setEvents] = useState<UploadedEvents | null>(null);

  const handleCancel = () => setEvents(null);

  return events ? (
    <SaveSchedule events={events} onCancel={handleCancel} />
  ) : (
    <UploadForm onUpload={setEvents} />
  );
};

export default withRoleAccess(UploadSchedulePage)(Role.ADMIN);
