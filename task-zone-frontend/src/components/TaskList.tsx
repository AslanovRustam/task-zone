import { useState, type FC } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { selectUserTasks } from "../store/selectors";
import TaskItem from "./TaskItem";
import PaginationCmp from "./PaginationCmp";
import EditTaskModal from "./EditTaskModal";
import { DEFAULT_TASK } from "../constants";

interface TaskListProps {}

const TaskList: FC<TaskListProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tasks = useSelector(selectUserTasks);

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#383837" }}>
              <TableCell
                sx={{
                  width: "5%",
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid white",
                }}
              >
                №
              </TableCell>
              <TableCell
                sx={{
                  width: "55%",
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid white",
                }}
              >
                Task name
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid white",
                }}
              >
                Staus
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid white",
                }}
              >
                Comleted
              </TableCell>
              <TableCell
                sx={{
                  width: "20%",
                  color: "white",
                  fontWeight: "bold",
                  border: "1px solid white",
                }}
              >
                <EditTaskModal task={DEFAULT_TASK} newTask />
              </TableCell>
            </TableRow>
          </TableHead>
          {tasks.length && (
            <TableBody>
              {paginatedTasks.map((task, idx) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  taskNumber={idx + 1}
                  setCurrentPage={setCurrentPage}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!tasks.length && (
        <Typography
          variant="h5"
          fontWeight="bold"
          align="center"
          width={"100%"}
        >
          Tasks not found...
        </Typography>
      )}

      {tasks.length > rowsPerPage && (
        <PaginationCmp
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          tasks={tasks}
        />
      )}
    </>
  );
};

export default TaskList;
