import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loginUser, signInUser, updateUser } from "./operations";
import { User } from "../../types/types";
import { deleteTask, fetchUserTasks, updateTask } from "../task/operations";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const handlePending = (state: AuthState): void => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state: AuthState, action: UnknownAction): void => {
  toast.error(action.payload as string);
  state.loading = false;
  state.error =
    typeof action.payload === "string" ? action.payload : "An error occurred";
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string | null }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.error = null;
      }
    );
    builder.addCase(signInUser.fulfilled, (state, { payload }) => {
      state.token = payload;
      state.loading = false;
    });
    builder.addCase(fetchUserTasks.fulfilled, (state, { payload }) => {
      if (state.user) {
        state.user.tasks = payload;
        state.loading = false;
      }
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      if (state.user && state.user.tasks) {
        state.user.tasks = state.user.tasks.map((task) =>
          task.id === payload.id ? payload : task
        );
      }
      state.loading = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      const newTasks = state.user?.tasks.filter(
        (task) => task.id !== payload?.id
      );

      if (state.user && newTasks) {
        state.user.tasks = newTasks;
      }
      state.loading = false;
    });
    //update avatar
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      if (state.user && state.user.avatarUrl) {
        state.user.avatarUrl = payload.avatarUrl;
        state.loading = false;
      }
    });
    // matchers for pending and rejected
    builder.addMatcher(
      isPending(loginUser, signInUser, fetchUserTasks, updateUser),
      handlePending
    );
    builder.addMatcher(
      isRejected(loginUser, signInUser, fetchUserTasks, updateUser),
      handleRejected
    );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
