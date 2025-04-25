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
  Button,
} from "@mui/material";
import { selectAllTasks } from "../store/selectors";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import EditTask from "./EditTask";
import PaginationCmp from "./PaginationCmp";
import { DEFAULT_TASK } from "../constants";

interface TaskListProps {}

const TaskList: FC<TaskListProps> = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tasks = useSelector(selectAllTasks);

  const toggleModal = () => {
    setOpen(!open);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="task table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell
                sx={{ width: "5%", color: "white", fontWeight: "bold" }}
              >
                №
              </TableCell>
              <TableCell
                sx={{ width: "55%", color: "white", fontWeight: "bold" }}
              >
                Task name
              </TableCell>
              <TableCell
                sx={{ width: "20%", color: "white", fontWeight: "bold" }}
              >
                Staus
              </TableCell>
              <TableCell
                sx={{
                  width: "15%",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Comleted
              </TableCell>
              <TableCell
                sx={{ width: "20%", color: "white", fontWeight: "bold" }}
              >
                <Button
                  variant="contained"
                  color="primaryNew"
                  onClick={toggleModal}
                >
                  New Task
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task, idx) => (
              <TaskItem key={task.id} task={task} taskNumber={idx + 1} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaginationCmp
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
        tasks={tasks}
      />

      <TaskModal open={open} onClose={toggleModal}>
        <EditTask onClose={toggleModal} task={DEFAULT_TASK} newTask />
      </TaskModal>
    </>
  );
};

export default TaskList;
