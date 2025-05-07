import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthActionTypes } from "../../types/types";
import { instance, setAuthToken } from "../../utils/api";

export const loginUser = createAsyncThunk(
  AuthActionTypes.LOGIN,
  async (credentials: { username: string; password: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let token = state.user.token;

    try {
      if (!token) {
        const tokenResponse = await instance.post("/auth/login", credentials);
        token = tokenResponse.data.access_token;
      }

      setAuthToken(token);

      const userResponse = await instance.get(`/users/${credentials.username}`);

      const user = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        avatarUrl: userResponse.data.avatarUrl,
        tasks: userResponse.data.tasks || [],
      };

      return {
        token: token,
        user: user,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  AuthActionTypes.SIGN_IN,
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const tokenResponse = await instance.post("/users", credentials);
      const token = tokenResponse.data.access_token;

      setAuthToken(token);

      return token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  AuthActionTypes.UPDATE,
  async (credentials: { file: File }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let userId = state.user.user?.id;
    try {
      const formData = new FormData();
      formData.append("avatar", credentials.file);
      const response = await instance.post(
        `/users/${userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
