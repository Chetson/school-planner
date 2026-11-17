import { Typography } from '@shared/ui';

import { SubjectsHeader } from '../../features';
import { StaticCell, SubHeader } from '../../ui';
import { columnHelper, renderCell } from '../helpers';
import { TableAccessorKey } from '../types';

import type { StudentModel } from '@entities/user';

export type SubjectColumnsProps = {
  student: StudentModel;
  studentList?: StudentModel[];
  onSelectStudent?: (student: StudentModel) => void;
};

export const getSubjectColumns = ({
  student,
  studentList,
  onSelectStudent,
}: SubjectColumnsProps) => [
  columnHelper.group({
    id: TableAccessorKey.SUBJECTS,
    header: () => (
      <SubjectsHeader
        student={student}
        list={studentList}
        onChange={onSelectStudent}
      />
    ),
    columns: [
      columnHelper.accessor(
        ({ title }) => (
          <StaticCell>
            <Typography className="text-nowrap" variant="regular3">
              {title}
            </Typography>
          </StaticCell>
        ),
        {
          id: TableAccessorKey.SUBJECTS,
          header: () =>
            student.extra.currentClass ? (
              <SubHeader className="bg-decorative-blue">
                <Typography variant="regular3" color="disable">
                  {student.extra.currentClass.className}
                </Typography>
              </SubHeader>
            ) : null,
          cell: renderCell,
        },
      ),
    ],
  }),
];
