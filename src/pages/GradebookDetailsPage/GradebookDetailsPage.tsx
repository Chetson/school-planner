import { Role } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { ClassFilter } from '@features/ClassFilter';
import { GradebookNavigation } from '@features/GradebookNavigation';
import QuarterFilter from '@features/QuarterFilter/QuarterFilter.tsx';
import { SubjectFilter } from '@features/SubjectFilter';
import { TableLayout } from '@features/TableLayout';

import { TeacherFilters } from './features/TeacherFilters';
import { CommonGradebook } from './widgets/CommonGradebook';
import { ParentGradebook } from './widgets/ParentGradebook';
import { StudentGradebook } from './widgets/StudentGradebook';
import { TeacherGradebook } from './widgets/TeacherGradebook';

const GradebookPage = () => (
  <TableLayout
    title={<GradebookNavigation />}
    tools={
      <>
        <AccessRole role={Role.ADMIN}>
          <ClassFilter />
          <SubjectFilter />
        </AccessRole>
        <AccessRole role={Role.TEACHER}>
          <TeacherFilters />
        </AccessRole>
        <QuarterFilter />
      </>
    }
  >
    <AccessRole role={Role.ADMIN}>
      <CommonGradebook />
    </AccessRole>
    <AccessRole role={Role.STUDENT}>
      {(student) => <StudentGradebook student={student} />}
    </AccessRole>
    <AccessRole role={Role.TEACHER}>
      {(teacher) => <TeacherGradebook teacher={teacher} />}
    </AccessRole>
    <AccessRole role={Role.PARENT}>
      {(parent) => <ParentGradebook parent={parent} />}
    </AccessRole>
  </TableLayout>
);

export default GradebookPage;
