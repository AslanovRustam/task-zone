import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
//Components
import { Divider, Paper } from "@mui/material";
import SingleTaskCmp from "../components/SingleTaskCmp";
import Comments from "../components/Comments";
//Utils
import { AppDispatch } from "../store";
import { fetchTaskById } from "../store/task/operations";
import { selectCurrentTask } from "../store/selectors";

export default function SingleTask() {
  const currentTask = useSelector(selectCurrentTask);
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

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
      <SingleTaskCmp currentTask={currentTask} />
      <Divider sx={{ mb: 2, mt: 2 }} />
      {currentTask?.comments && currentTask?.comments.length > 0 && (
        <Comments comments={currentTask.comments} />
      )}
    </Paper>
  );
}
