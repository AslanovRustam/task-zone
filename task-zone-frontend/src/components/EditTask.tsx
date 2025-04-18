import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useDispatch } from "react-redux";
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

interface EditTaskProps {
  onClose: () => void;
  localTask: Task;
  setLocalTask: Dispatch<SetStateAction<Task>>;
  newTaks?: boolean;
}

const EditTask: FC<EditTaskProps> = ({
  onClose,
  localTask,
  setLocalTask,
  newTaks,
}) => {
  const dispatch = useDispatch<AppDispatch>();

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

      setLocalTask((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = () => {
    if (newTaks) {
      dispatch(createTask(localTask));
      setLocalTask(DEFAULT_TASK);
      onClose();
      return;
    }
    dispatch(updateTask({ id: localTask.id!, data: localTask }));
    onClose();
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
        <Button variant="contained" onClick={handleSubmit}>
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
