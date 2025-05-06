import { createSelector } from "@reduxjs/toolkit";
import { Task } from "../types/types";
import { RootState } from ".";
import { User } from "./user/userSlice";

export const selectAllTasks = (state: RootState): Task[] => state.tasks.items;

export const selectIsLoading = (state: RootState): boolean =>
  state.user.loading || state.tasks.loading || state.comments.loading;

export const selectUserError = (state: RootState) => state.user.error;
export const selectTaskError = (state: RootState) => state.tasks.error;
export const selectCommentsError = (state: RootState) => state.comments.error;

export const selectIsError = createSelector(
  [selectUserError, selectTaskError, selectCommentsError],
  (user, task, comments) => ({
    user,
    task,
    comments,
  })
);

export const selectCurrentTask = (state: RootState): Task | null =>
  state.tasks.currentTask;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.user.isAuthenticated;

export const selectUserTasks = (state: RootState): Task[] =>
  state.user.user?.tasks || [];

export const selectUser = (state: RootState): User | null => state.user.user;

export const selectUserName = (state: RootState): string | undefined =>
  state.user.user?.username;
export const selectUserAvatar = (state: RootState): string | undefined =>
  state.user.user?.avatarUrl;
