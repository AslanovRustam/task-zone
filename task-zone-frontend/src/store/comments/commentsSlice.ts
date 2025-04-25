import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { UnknownAction } from "@reduxjs/toolkit";
import { Comment } from "../../types/types";
import {
  deleteComment,
  deleteCommentAndRefreshTask,
  fetchAllComments,
  fetchTaskComments,
  updateComment,
  updateCommentAndRefreshTask,
} from "./operations";

export interface InitialState {
  items: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: [] as Comment[],
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

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get all comments
    builder.addCase(fetchAllComments.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    //get single Task comments
    builder.addCase(fetchTaskComments.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    //delete comment
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      const newComments = state.items.filter(
        (comment) => comment.id !== payload?.id
      );

      state.items = newComments;
      state.loading = false;
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(
        deleteComment,
        deleteCommentAndRefreshTask,
        fetchAllComments,
        fetchTaskComments,
        updateComment,
        updateCommentAndRefreshTask
      ),
      handlePending
    );

    builder.addMatcher(
      isRejected(
        deleteComment,
        deleteCommentAndRefreshTask,
        fetchAllComments,
        fetchTaskComments,
        updateComment,
        updateCommentAndRefreshTask
      ),
      handleRejected
    );
  },
});

export default commentsSlice.reducer;
