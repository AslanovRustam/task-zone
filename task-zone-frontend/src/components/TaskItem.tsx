import { Dispatch, SetStateAction, useState, type FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, TableCell, TableRow } from "@mui/material";
import { selectIsLoading } from "../store/selectors";
import TaskModal from "./TaskModal";
import EditTask from "./EditTask";
import { Loader } from "./Loader/Loader";
import DeleteTask from "./DeleteTask";
import { Task } from "../types/types";

interface TaskItemProps {
  task: Task;
  taskNumber: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TaskItem: FC<TaskItemProps> = ({ task, taskNumber, setCurrentPage }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  const toggleEditModal = () => {
    setEditOpen(!editOpen);
  };

  const handleTaskDeleteModal = () => {
    setDeleteOpen(!deleteOpen);
  };

  const handleGoToSingleTaks = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <>
      <TableRow
        sx={{
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
        }}
        onClick={handleGoToSingleTaks}
      >
        <TableCell sx={{ width: "5%", opacity: 0.5 }}>{taskNumber}</TableCell>
        <TableCell sx={{ width: "60%" }}>{task.name}</TableCell>
        <TableCell sx={{ width: "20%" }}>{task.status}</TableCell>
        <TableCell
          sx={{
            width: "15%",
            textAlign: "center",
            color: task.isDone ? "green" : "red",
          }}
        >
          {task.isDone ? "done" : "in process"}
        </TableCell>
        <TableCell sx={{ width: "15%", zIndex: 1 }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleEditModal();
            }}
            sx={{ width: "100%", marginBottom: "5px" }}
          >
            Edit
          </Button>
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
        </TableCell>
      </TableRow>
      {isLoading && (
        <TableRow>
          <TableCell>
            <Loader />
          </TableCell>
        </TableRow>
      )}
      <TaskModal open={editOpen} onClose={toggleEditModal}>
        <EditTask onClose={toggleEditModal} task={task} />
      </TaskModal>
      <TaskModal open={deleteOpen} onClose={handleTaskDeleteModal}>
        <DeleteTask
          onClose={handleTaskDeleteModal}
          task={task}
          setCurrentPage={setCurrentPage}
        />
      </TaskModal>
    </>
  );
};

export default TaskItem;
