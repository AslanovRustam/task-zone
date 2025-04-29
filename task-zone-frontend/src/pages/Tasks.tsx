import { type FC } from "react";
import { Paper, Typography } from "@mui/material";
import TaskList from "../components/TaskList";

interface TasksProps {}

const Tasks: FC<TasksProps> = () => {
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
