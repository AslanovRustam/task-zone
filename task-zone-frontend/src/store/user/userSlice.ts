import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import type { PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { loginUser } from "./operations";
import { Task } from "../../types/types";
import { fetchUserTasks } from "../task/operations";

export interface User {
  id: string;
  username: string;
  password: string;
  tasks: Task[];
}

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

const handleRejected = (
  state: AuthState,
  //can use both variants PayloadAction<unknown> or UnknownAction
  action: UnknownAction
): void => {
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
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      }
    );
    builder.addCase(fetchUserTasks.fulfilled, (state, { payload }) => {
      if (state.user) {
        state.user.tasks = payload;
      }
    });
    //   .addCase(fetchCurrentUser.pending, handlePending)
    //   .addCase(fetchCurrentUser.rejected, handleRejected)
    //   .addCase(
    //     fetchCurrentUser.fulfilled,
    //     (state, action: PayloadAction<User>) => {
    //       state.loading = false;
    //       state.user = action.payload;
    //       state.isAuthenticated = true;
    //       state.error = null;
    //     }
    //   );
    // matchers for pending and rejected
    builder.addMatcher(isPending(loginUser, fetchUserTasks), handlePending);
    builder.addMatcher(isRejected(loginUser, fetchUserTasks), handleRejected);
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
