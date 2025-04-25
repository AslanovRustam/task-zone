import { useEffect, type FC } from "react";
import { useDispatch } from "react-redux";
import { Paper, Typography } from "@mui/material";
import type { AppDispatch } from "../store";
import { fetchAllTasks } from "../store/task/operations";
import TaskList from "../components/TaskList";

interface TasksProps {}

const Tasks: FC<TasksProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 4, borderRadius: 2, width: "100%", alignItems: "end" }}>
      <Typography variant="h5" fontWeight="bold">
        List of actual tasks
      </Typography>
      <br />
      <TaskList />
    </Paper>
  );
};

export default Tasks;
