import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../task/operations";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const tokenResponse = await instance.post("/auth/login", credentials);

      const userResponse = await instance.get(
        `/users/${credentials.username}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        }
      );

      return {
        token: tokenResponse.data.access_token,
        user: userResponse.data,
      };
    } catch (error: any) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
