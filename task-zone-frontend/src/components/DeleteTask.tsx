import { Box, Button, Typography } from "@mui/material";
import type { FC } from "react";
import { Task } from "../types/types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { deleteTask } from "../store/task/operations";

interface DeleteTaskProps {
  onClose: () => void;
  localTask: Task;
}

const DeleteTask: FC<DeleteTaskProps> = ({ onClose, localTask }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    await dispatch(deleteTask(localTask.id!));
    toast.error("Task deleted successfully");
    onClose();
  };
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6" component="p">
        Are you sure you want to delete the task{" "}
        <Box component="span" fontWeight={600}>
          "{localTask.name}"
        </Box>
        ?
      </Typography>
      <Box display="flex" justifyContent="space-evenly" gap={2}>
        <Button variant="contained" color="error" onClick={handleSubmit}>
          Delete
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteTask;
