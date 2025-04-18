export interface Task {
  id?: string;
  name: string;
  isDone: boolean;
  status: string;
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
