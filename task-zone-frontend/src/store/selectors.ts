import { Task } from "../types/types";
import { RootState } from ".";
import { User } from "./user/userSlice";

export const selectAllTasks = (state: RootState): Task[] => state.tasks.items;
export const selectIsLoading = (state: RootState): boolean =>
  state.tasks.loading;
export const selectIsError = (state: RootState): string | null =>
  state.tasks.error;
export const selectCurrentTask = (state: RootState): Task | null =>
  state.tasks.currentTask;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.user.isAuthenticated;
export const selectError = (state: RootState): string | null =>
  state.user.error;
export const selectUserTasks = (state: RootState): Task[] =>
  state.user.user?.tasks || [];
export const selectUser = (state: RootState): User | null => state.user.user;
export const selectUserName = (state: RootState): string | undefined =>
  state.user.user?.username;
