import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import TaskModal from "./TaskModal";
import DeleteTask from "./DeleteTask";
import { Task } from "../types/types";

type Props = { task: Task; setCurrentPage?: Dispatch<SetStateAction<number>> };

export default function DeleteTaskModal({ task, setCurrentPage }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleTaskDeleteModal = (): void => {
    setDeleteOpen(!deleteOpen);
  };
  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleTaskDeleteModal();
        }}
      >
        Delete
      </Button>
      <TaskModal open={deleteOpen} onClose={handleTaskDeleteModal}>
        <DeleteTask
          onClose={handleTaskDeleteModal}
          task={task}
          setCurrentPage={setCurrentPage}
        />
      </TaskModal>
    </>
  );
}
