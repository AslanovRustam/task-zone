import { Task } from "../types/types";
import { RootState } from ".";

export const selectAllTasks = (state: RootState): Task[] => state.tasks.items;
export const selectIsLoading = (state: RootState): boolean =>
  state.tasks.loading;
export const selectIsError = (state: RootState): string | null =>
  state.tasks.error;
export const selectCurrentTask = (state: RootState): Task | null =>
  state.tasks.currentTask;
