import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import commentsReducer from "./comments/commentsSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
