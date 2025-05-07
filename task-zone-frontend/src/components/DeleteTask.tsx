import { Box, Button, Typography } from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";
import { Task } from "../types/types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { deleteTask } from "../store/task/operations";

interface DeleteTaskProps {
  onClose: () => void;
  task: Task;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
}

const DeleteTask: FC<DeleteTaskProps> = ({ onClose, task, setCurrentPage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (): Promise<void> => {
    try {
      await dispatch(deleteTask(task.id!));
      if (setCurrentPage) {
        setCurrentPage(1);
      }
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Task is not deleted!");
    } finally {
      onClose();
    }
  };
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6" component="p">
        Are you sure you want to delete the task{" "}
        <Box component="span" fontWeight={600}>
          "{task.name}"
        </Box>
        ?
      </Typography>
      <Box display="flex" justifyContent="space-evenly" gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteTask;
