import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../task/operations";
import { Comment, Task } from "../../types/types";
import { updateCurrentTask } from "../task/taskSlice";
import { RootState } from "..";

export const fetchAllComments = createAsyncThunk(
  "comments/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/comments");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const fetchTaskComments = createAsyncThunk(
  "comments/getTaskComment",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get(`/tasks/${id}/comments`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (payload: { id: string; data: Partial<Comment> }, thunkAPI) => {
    try {
      const response = await instance.patch(`/comments/${payload.id}`, {
        ...payload.data,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.delete(`/comments/${id}`);

      return { id: id, message: response.data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteCommentAndRefreshTask = createAsyncThunk(
  "comments/deleteAndRefresh",
  async (
    { commentId, currentTask }: { commentId: string; currentTask: Task },
    thunkAPI
  ) => {
    try {
      await thunkAPI.dispatch(deleteComment(commentId)).unwrap();

      const updatedComments = await thunkAPI
        .dispatch(fetchTaskComments(currentTask.id!))
        .unwrap();

      thunkAPI.dispatch(
        updateCurrentTask({ ...currentTask, comments: updatedComments })
      );

      return updatedComments;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to delete comment and refresh task"
      );
    }
  }
);

export const updateCommentAndRefreshTask = createAsyncThunk<
  Comment[], // return type
  { commentId: string; content: string },
  { state: RootState }
>("comments/updateAndRefresh", async ({ commentId, content }, thunkAPI) => {
  try {
    const { currentTask } = thunkAPI.getState().tasks;
    await thunkAPI
      .dispatch(updateComment({ id: commentId, data: { content } }))
      .unwrap();
    if (!currentTask || !currentTask.id) {
      throw new Error("Current task is not defined");
    }
    const updatedComments = await thunkAPI
      .dispatch(fetchTaskComments(currentTask.id))
      .unwrap();
    thunkAPI.dispatch(
      updateCurrentTask({ ...currentTask, comments: updatedComments })
    );

    return updatedComments;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "Failed to delete comment and refresh task"
    );
  }
});
