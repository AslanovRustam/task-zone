import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  fetchTaskById,
  updateTask,
} from "./operations";
import { Task } from "../../types/types";

export interface InitialState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: [] as Task[],
  loading: false,
  error: null,
};

const handlePending = (state: InitialState): void => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (
  state: InitialState,
  //can use both variants PayloadAction<unknown> or UnknownAction
  action: UnknownAction
): void => {
  state.loading = false;
  state.error =
    typeof action.payload === "string" ? action.payload : "An error occurred";
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all tasks
    builder.addCase(fetchAllTasks.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    //update task
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      const newTasks = state.items.map((task) =>
        task.id === payload.id ? payload : task
      );

      state.items = newTasks;
      state.loading = false;
    });
    //delete task
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      const newTasks = state.items.filter((task) => task.id !== payload?.id);

      state.items = newTasks;
      state.loading = false;
    });
    //create task
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(
        fetchAllTasks,
        updateTask,
        deleteTask,
        createTask,
        fetchTaskById
      ),
      handlePending
    );

    builder.addMatcher(
      isRejected(
        fetchAllTasks,
        updateTask,
        deleteTask,
        createTask,
        fetchTaskById
      ),
      handleRejected
    );
  },
});

export default taskSlice.reducer;
