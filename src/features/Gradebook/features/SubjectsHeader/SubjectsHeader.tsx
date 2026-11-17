import { getStudentName, useToggle } from '@shared/helpers';
import { Dropdown, SwitchIcon } from '@shared/ui';

import { GradebookDropdown, Header } from '../../ui';

import type { StudentOption } from './types';
import type { StudentModel } from '@entities/user';
import type { FC } from 'react';

export type SubjectsHeader = {
  student: StudentModel;
  list?: StudentModel[];
  onChange?: (student: StudentModel) => void;
};

const createDropdownOption = (student: StudentModel): StudentOption => ({
  id: student.id,
  title: getStudentName(student),
  student,
});

export const SubjectsHeader: FC<SubjectsHeader> = ({
  student,
  list,
  onChange,
}) => {
  const [opened, { setOpened }] = useToggle();

  if (!list) return <Header>{getStudentName(student)}</Header>;

  return (
    <GradebookDropdown
      onOpenChange={setOpened}
      items={list.map(createDropdownOption)}
      value={createDropdownOption(student)}
      onChange={(option) => option && onChange?.(option.student)}
    >
      <Dropdown.Trigger className="h-full">
        <Header titleClassName="flex items-center">
          {getStudentName(student)}
          <SwitchIcon opened={opened} />
        </Header>
      </Dropdown.Trigger>
    </GradebookDropdown>
  );
};
