import { type FC } from "react";
import { NavLink } from "react-router";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { Task } from "../types/types";

import { getStatusColor } from "../utils/getStatusColor";

interface SingleTaskCmpProps {
  currentTask: Task;
  toggleEditModal: () => void;
  handleTaskDeleteModal: () => void;
  toggleAddCommentModal: () => void;
}

const SingleTaskCmp: FC<SingleTaskCmpProps> = ({
  currentTask,
  toggleEditModal,
  handleTaskDeleteModal,
  toggleAddCommentModal,
}) => {
  return (
    <>
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
        justifyContent="space-between"
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleAddCommentModal}
        >
          Add comment
        </Button>
        <Box gap={2} display="flex" alignItems="center">
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
      </Box>
    </>
  );
};

export default SingleTaskCmp;
