import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../task/operations";
import { toast } from "react-toastify";
import { RootState } from "..";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let token = state.user.token;

    try {
      if (!token) {
        const tokenResponse = await instance.post("/auth/login", credentials);
        token = tokenResponse.data.access_token;
      }

      const userResponse = await instance.get(
        `/users/${credentials.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        token: token,
        user: userResponse.data,
      };
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const tokenResponse = await instance.post("/auth/login", credentials);

      return tokenResponse.data.access_token;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
