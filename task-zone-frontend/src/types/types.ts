export interface Task {
  id?: string;
  name: string;
  isDone: boolean;
  status: string;
  comments?: Comment[];
  userId: string;
}

export interface TasksState {
  tasks: Task[];
}

export interface RootState {
  tasks: TasksState;
}

export const STATUS = {
  NEW: "new",
  IN_WORK: "in work",
  COMPLETED: "completed",
} as const;

export interface Comment {
  author: string;
  content: string;
  taskId: Task | string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User {
  id: string;
  username: string;
  // password: string;
  tasks: Task[];
  avatarUrl?: string;
}

export enum AuthActionTypes {
  LOGIN = "auth/login",
  SIGN_IN = "auth/signIn",
  UPDATE = "user/update",
}
