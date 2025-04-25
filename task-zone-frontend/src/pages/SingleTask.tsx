import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
//Components
import { Divider, Paper } from "@mui/material";
import TaskModal from "../components/TaskModal";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";
import SingleTaskCmp from "../components/SingleTaskCmp";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
//Utils
import { AppDispatch } from "../store";
import { fetchTaskById } from "../store/task/operations";
import { selectCurrentTask } from "../store/selectors";

export default function SingleTask() {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addCommentOpenModal, setAddCommentOpenModal] = useState(false);
  const currentTask = useSelector(selectCurrentTask);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const toggleEditModal = () => {
    setEditOpen(!editOpen);
  };

  const handleTaskDeleteModal = () => {
    setDeleteOpen(!deleteOpen);
  };

  const toggleAddCommentModal = () => {
    setAddCommentOpenModal(!addCommentOpenModal);
  };

  useEffect(() => {
    if (!id) return;
    dispatch(fetchTaskById(id));
  }, [id]);

  if (!currentTask) return <div>Task not find...</div>;

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 2, width: "100%", alignItems: "end" }}
    >
      <SingleTaskCmp
        currentTask={currentTask}
        toggleEditModal={toggleEditModal}
        handleTaskDeleteModal={handleTaskDeleteModal}
        toggleAddCommentModal={toggleAddCommentModal}
      />
      <Divider sx={{ mb: 2, mt: 2 }} />
      {currentTask?.comments && currentTask?.comments.length > 0 && (
        <Comments comments={currentTask.comments} />
      )}
      {/* //Modals for editing and deleting task */}
      <TaskModal open={editOpen} onClose={toggleEditModal}>
        <EditTask onClose={toggleEditModal} task={currentTask} />
      </TaskModal>
      <TaskModal open={deleteOpen} onClose={handleTaskDeleteModal}>
        <DeleteTask onClose={handleTaskDeleteModal} task={currentTask} />
      </TaskModal>
      <TaskModal open={addCommentOpenModal} onClose={toggleAddCommentModal}>
        <AddComment onClose={toggleAddCommentModal} id={currentTask.id || ""} />
      </TaskModal>
    </Paper>
  );
}
