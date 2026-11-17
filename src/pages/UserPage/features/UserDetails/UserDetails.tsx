import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';

import { Role, USER_QUERY_KEYS } from '@entities/user';
import { AccessRole } from '@features/AccessRole';
import { BlockUser } from '@features/BlockUser';
import { CuratorBadge } from '@features/CuratorBadge';
import { RoleBadge } from '@features/RoleBadge';
import { UserAvatar } from '@features/UserAvatar';
import {
  createBreadcrumb,
  getFullName,
  IconKind,
  PAGES,
} from '@shared/helpers';
import { Button, Icon, PageLayout, Typography, withModal } from '@shared/ui';
import { Card } from '@shared/ui/Card';

import type { UserModel } from '@entities/user';
import type { FC } from 'react';

const BlockUserModal = withModal(BlockUser);

export interface UserDetailsProps {
  user: UserModel;
}

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const [blockedUser, setBlockedUser] = useState<UserModel | null>(null);
  const location = useLocation();

  const queryClient = useQueryClient();

  const handleCancelBlockUser = useCallback(() => setBlockedUser(null), []);

  const handleModalOpenChange = useCallback(
    (opened: boolean) => !opened && setBlockedUser(null),
    [],
  );

  const handleModalBlockUser = useCallback(() => {
    setBlockedUser(null);
    queryClient.invalidateQueries({
      queryKey: USER_QUERY_KEYS(user.id),
    });
  }, [setBlockedUser, queryClient, user]);

  const cardItems = useMemo(() => {
    return [
      {
        title: user.email,
        subtitle: 'Логин',
      },
      {
        title: user.rawPassword,
        subtitle: 'Пароль',
      },
      {
        title: user.comment,
        subtitle: 'Комментарий',
      },
      {
        title: user.city,
        subtitle: 'Город',
      },
      {
        title: user.phoneNumber,
        subtitle: 'Телефон',
      },
    ].filter((item) => item.title);
  }, [user]);

  const isCurator = user.role === Role.TEACHER && user.extra.isCurator;
  const curatedClassName =
    isCurator &&
    user.extra.curatedClasses.length > 0 &&
    user.extra.curatedClasses[0].className;

  return (
    <>
      <PageLayout className="mb-4">
        <article className="flex gap-2 items-center">
          <div
            className={`flex grow gap-2 ${user.isBlocked && ' grayscale opacity-50'}`}
          >
            <UserAvatar src="" className="w-16 h-16" />
            <div className="flex flex-col justify-center grow">
              <div>
                <RoleBadge role={user.role} />{' '}
                {isCurator && (
                  <CuratorBadge
                    clsName={curatedClassName ? curatedClassName : ''}
                  />
                )}
              </div>
              <Typography className="truncate block" variant="h3">
                {getFullName(user)}
              </Typography>
            </div>
          </div>

          <div className="flex gap-2">
            <AccessRole role={Role.ADMIN}>
              <Link
                title={getFullName(user)}
                to={PAGES.EDIT_USER.create(user.id)}
                state={{
                  crumb: createBreadcrumb({
                    ...location,
                    title: getFullName(user),
                  }),
                }}
              >
                <Button className="h-12 bg-gray-200 px-3.5" variant="tertiary">
                  <Icon kind={IconKind.PENCIL} />
                </Button>
              </Link>
              <Button
                variant="tertiary"
                className="h-12 bg-gray-200 px-3.5"
                onClick={() => setBlockedUser(user)}
              >
                <Icon kind={user.isBlocked ? IconKind.LOCK : IconKind.UNLOCK} />
              </Button>
            </AccessRole>
          </div>
        </article>
      </PageLayout>
      <Card
        title="Личные данные"
        icon={IconKind.ADDRESS_BOOK}
        color={user.isBlocked ? 'gray' : 'blue'}
        items={cardItems}
        className="h-40"
      />
      <BlockUserModal
        open={Boolean(blockedUser)}
        onOpenChange={handleModalOpenChange}
        user={blockedUser}
        onCancel={handleCancelBlockUser}
        onSuccess={handleModalBlockUser}
      />
    </>
  );
};
