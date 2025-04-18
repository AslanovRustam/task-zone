import { STATUS } from "./types/types";

export const PATH = {
  HOME: "/",
  TASKS: "/tasks",
};

export const DEFAULT_TASK = {
  name: "",
  isDone: false,
  status: STATUS.NEW,
};
