import type { UserListModel, UserModel } from '@entities/user';
import type { InfiniteData } from '@tanstack/react-query';

export const replaceUserInList = (
  data: InfiniteData<UserListModel, number>,
  newUser: UserModel,
): InfiniteData<UserListModel, number> => ({
  ...data,
  pages: data.pages.map((page) => {
    const userIndex = page.results.findIndex((user) => user.id === newUser.id);
    if (userIndex !== -1) {
      page.results[userIndex] = { ...page.results[userIndex], ...newUser };
    }

    return page;
  }),
});
