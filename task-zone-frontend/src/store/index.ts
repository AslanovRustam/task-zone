import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/taskSlice";
import commentsReducer from "./comments/commentsSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
