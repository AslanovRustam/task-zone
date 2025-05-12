import { useState } from "react";
import TaskModal from "./TaskModal";
import EditTask from "./EditTask";
import { Task } from "../types/types";
import { Button } from "@mui/material";

type Props = { task: Task; newTask?: boolean };

export default function EditTaskModal({ task, newTask }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const toggleEditModal = (): void => {
    setEditOpen(!editOpen);
  };
  return (
    <>
      <Button
        variant="outlined"
        color={newTask ? "success" : "primary"}
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          toggleEditModal();
        }}
        sx={{ width: "100%", backgroundColor: "white" }}
      >
        {newTask ? "New Task" : "Edit"}
      </Button>
      <TaskModal open={editOpen} onClose={toggleEditModal}>
        <EditTask onClose={toggleEditModal} task={task} newTask={newTask} />
      </TaskModal>
    </>
  );
}
