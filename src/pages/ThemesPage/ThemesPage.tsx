import { Link } from 'react-router-dom';

import { ClassFilter } from '@features/ClassFilter';
import { GradebookNavigation } from '@features/GradebookNavigation';
import { SubjectFilter } from '@features/SubjectFilter';
import { TableLayout } from '@features/TableLayout';
import { DuplicateButton } from '@pages/ThemesPage';
import { IconKind, PAGES } from '@shared/helpers';
import { Button } from '@shared/ui';

import { ThemesTable } from './widgets/ThemesTable';

const ThemesPage = () => (
  <TableLayout
    title={<GradebookNavigation />}
    tools={
      <>
        <Link to={PAGES.CREATE_THEME.mask}>
          <Button isFullSize={false} leftElement={IconKind.FOLDER_PLUS}>
            Добавить
          </Button>
        </Link>
        <Link to={PAGES.UPLOAD_THEMES.mask}>
          <Button
            variant="secondary"
            isFullSize={false}
            leftElement={IconKind.DOWNLOAD}
          >
            Загрузить
          </Button>
        </Link>
      </>
    }
  >
    <div className="flex gap-4 flex-wrap">
      <ClassFilter />
      <SubjectFilter />
      <DuplicateButton />
    </div>
    <ThemesTable />
  </TableLayout>
);

export default ThemesPage;
