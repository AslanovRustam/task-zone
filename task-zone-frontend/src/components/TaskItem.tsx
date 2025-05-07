import { Dispatch, SetStateAction, type FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, TableCell, TableRow } from "@mui/material";
import { Loader } from "./Loader/Loader";
import EditTaskModal from "./EditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { Task } from "../types/types";
import { selectIsLoading } from "../store/selectors";

interface TaskItemProps {
  task: Task;
  taskNumber: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const TaskItem: FC<TaskItemProps> = ({ task, taskNumber, setCurrentPage }) => {
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  const handleGoToSingleTaks = (): void => {
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EditTaskModal task={task} />
            <DeleteTaskModal setCurrentPage={setCurrentPage} task={task} />
          </Box>
        </TableCell>
      </TableRow>
      {isLoading && (
        <TableRow>
          <TableCell>
            <Loader />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default TaskItem;
