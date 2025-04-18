import type { FC, ReactNode } from "react";
import { Box, Modal } from "@mui/material";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const TaskModal: FC<TaskModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default TaskModal;
