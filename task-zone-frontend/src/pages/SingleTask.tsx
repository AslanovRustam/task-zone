import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import { toast } from "react-toastify";
//Components
import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import TaskModal from "../components/TaskModal";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";

//Utils
import { AppDispatch } from "../store";
import { fetchTaskById } from "../store/task/operations";
import { selectIsLoading } from "../store/selectors";
import { getStatusColor } from "../utils/getStatusColor";
import { DEFAULT_TASK } from "../constants";
import { Task } from "../types/types";
import { Loader } from "../components/Loader/Loader";

export default function SingleTask() {
  const [currentTask, setCurrentTask] = useState<Task>(DEFAULT_TASK);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const loading = useSelector(selectIsLoading);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const toggleEditModal = () => {
    setEditOpen(!editOpen);
  };

  const handleTaskDeleteModal = () => {
    setDeleteOpen(!deleteOpen);
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchTaskById(id))
      .unwrap()
      .then((task) => {
        setCurrentTask(task);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [id]);

  //   if (!loading) return <Loader />;

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 2, width: "100%", alignItems: "end" }}
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={60}
      >
        <NavLink
          to="/tasks"
          style={{
            textDecoration: "none",
            color: "inherit",
            position: "absolute",
            left: 0,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              padding: "4px 12px",
              border: "1px solid #ccc",
              borderRadius: 2,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#000000",
                color: "#fff",
              },
            }}
          >
            <KeyboardReturnIcon fontSize="medium" />
            <Typography variant="button" align="center">
              Back to Tasks
            </Typography>
          </Box>
        </NavLink>
        <Typography variant="h5" fontWeight="bold" align="center">
          Task Details
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Task Name:
          </Typography>
          <Typography variant="body1">{currentTask.name}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Status:
          </Typography>
          <Chip
            label={currentTask.status}
            color={getStatusColor(currentTask.status)}
            variant="outlined"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Completed:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: currentTask.isDone ? "success.main" : "warning.main",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {currentTask.isDone ? "YES" : "NO"}
          </Typography>
        </Box>
      </Box>
      <Box
        component="div"
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="end"
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleEditModal}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleTaskDeleteModal}
        >
          Delete
        </Button>
      </Box>
      <TaskModal open={editOpen} onClose={toggleEditModal}>
        <EditTask
          onClose={toggleEditModal}
          localTask={currentTask}
          setLocalTask={setCurrentTask}
        />
      </TaskModal>
      <TaskModal open={deleteOpen} onClose={handleTaskDeleteModal}>
        <DeleteTask onClose={handleTaskDeleteModal} localTask={currentTask} />
      </TaskModal>
    </Paper>
  );
}
