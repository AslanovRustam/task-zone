import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../types/types";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchAllTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/tasks");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/getOneTask",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (payload: { id: string; data: Partial<Task> }, thunkAPI) => {
    try {
      const response = await instance.patch(`/tasks/${payload.id}`, {
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

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (payload: string, thunkAPI) => {
    try {
      const response = await instance.delete(`/tasks/${payload}`);

      return { id: payload, message: response.data.message };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async (payload: Partial<Task>, thunkAPI) => {
    try {
      const response = await instance.post(`/tasks`, {
        ...payload,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
