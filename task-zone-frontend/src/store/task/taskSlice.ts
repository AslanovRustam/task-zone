import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { UnknownAction } from "@reduxjs/toolkit";
import {
  addComment,
  createTask,
  fetchAllTasks,
  fetchTaskById,
} from "./operations";
import { Task } from "../../types/types";

export interface InitialState {
  items: Task[];
  loading: boolean;
  error: string | null;
  currentTask: Task | null;
}

const initialState: InitialState = {
  items: [] as Task[],
  loading: false,
  error: null,
  currentTask: null,
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
  reducers: {
    updateCurrentTask(state, { payload }) {
      state.currentTask = { ...payload };
    },
  },
  extraReducers: (builder) => {
    //get all tasks
    builder.addCase(fetchAllTasks.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    //get task by ID
    builder.addCase(fetchTaskById.fulfilled, (state, { payload }) => {
      state.currentTask = payload;
      state.loading = false;
    });
    //create task
    builder.addCase(createTask.fulfilled, (state, _) => {
      state.loading = false;
    });
    //add comment
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.currentTask = payload;
      state.loading = false;
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(fetchAllTasks, createTask, fetchTaskById, addComment),
      handlePending
    );

    builder.addMatcher(
      isRejected(fetchAllTasks, createTask, fetchTaskById, addComment),
      handleRejected
    );
  },
});

export const { updateCurrentTask } = taskSlice.actions;
export default taskSlice.reducer;
