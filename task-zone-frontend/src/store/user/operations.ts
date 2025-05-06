import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../task/operations";
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
      // toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    try {
      const tokenResponse = await instance.post("/users", credentials);

      return tokenResponse.data.access_token;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (credentials: { file: File }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    let token = state.user.token;
    let userId = state.user.user?.id;
    try {
      const formData = new FormData();
      formData.append("avatar", credentials.file);
      const response = await instance.post(
        `/users/${userId}/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState() as RootState;
//     const savedToken = state.user.token;

//     if (!savedToken) {
//       return thunkAPI.rejectWithValue("Unable to fetch user");
//     }

//     try {
//       const response = await instance.get("/users/current");
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
