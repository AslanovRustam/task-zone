import { useState, type ChangeEvent, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AppDispatch } from "../store";
import { createTask, updateTask } from "../store/task/operations";
import { Task, STATUS } from "../types/types";
import { DEFAULT_TASK } from "../constants";
import { toast } from "react-toastify";
import { updateCurrentTask } from "../store/task/taskSlice";
import { selectIsLoading } from "../store/selectors";

interface EditTaskProps {
  onClose: () => void;
  task: Task;
  newTask?: boolean;
}

const EditTask: FC<EditTaskProps> = ({ onClose, task, newTask }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [localTask, setLocalTask] = useState<Task>(task);
  const isLoading = useSelector(selectIsLoading);

  const handleChange =
    (field: keyof Task) =>
    (
      e:
        | ChangeEvent<HTMLInputElement | { value: string }>
        | SelectChangeEvent<string>
    ) => {
      let value: string | boolean = e.target.value;

      if (field === "isDone" && "checked" in e.target) {
        value = e.target.checked;
      }
      setLocalTask((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async () => {
    try {
      if (newTask) {
        await dispatch(createTask(localTask)).unwrap();
        dispatch(updateCurrentTask(localTask));
        setLocalTask(DEFAULT_TASK);
        return;
      }

      await dispatch(
        updateTask({ id: localTask.id!, data: localTask })
      ).unwrap();
      dispatch(updateCurrentTask(localTask));
    } catch (e) {
      toast.error("Failed to save task");
    } finally {
      onClose();
    }
  };

  return (
    <>
      <TextField
        label="Task name"
        value={localTask ? localTask.name : ""}
        onChange={handleChange("name")}
        fullWidth
      />

      <Select
        value={localTask ? localTask.status : STATUS.NEW}
        onChange={handleChange("status")}
        fullWidth
      >
        {Object.entries(STATUS).map(([key, value]) => (
          <MenuItem value={value} key={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <Box
        component="label"
        display="flex"
        alignItems="center"
        sx={{ cursor: "pointer" }}
      >
        <Checkbox
          checked={localTask ? localTask.isDone : false}
          onChange={handleChange("isDone")}
        />
        {localTask?.isDone ? "Completed" : "In process"}
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default EditTask;
