import { Button } from "@mui/material";
import { useState } from "react";
import TaskModal from "./TaskModal";
import AddComment from "./AddComment";

type Props = { taskId: string };

export default function AddCommentModal({ taskId }: Props) {
  const [addCommentOpenModal, setAddCommentOpenModal] = useState(false);

  const toggleAddCommentModal = (): void => {
    setAddCommentOpenModal(!addCommentOpenModal);
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={toggleAddCommentModal}
      >
        Add comment
      </Button>
      <TaskModal open={addCommentOpenModal} onClose={toggleAddCommentModal}>
        <AddComment onClose={toggleAddCommentModal} id={taskId} />
      </TaskModal>
    </>
  );
}
