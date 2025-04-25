import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, type FC } from "react";
import { formatDate } from "../utils/formatDate";
import { Comment, Task } from "../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  deleteCommentAndRefreshTask,
  updateCommentAndRefreshTask,
} from "../store/comments/operations";

interface CommentItemProps {
  comment: Comment;
  currentTask: Task | null;
}

const CommentItem: FC<CommentItemProps> = ({ comment, currentTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteComment = () => {
    if (!currentTask) return;
    dispatch(
      deleteCommentAndRefreshTask({
        commentId: comment.id,
        currentTask: currentTask!,
      })
    );
  };

  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveEdit = () => {
    dispatch(
      updateCommentAndRefreshTask({
        commentId: comment.id,
        content: editedContent,
      })
    );
    console.log("New content:", editedContent);
    setIsEditing(false);
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection="column"
        gap={1}
        justifyContent={"space-between"}
        sx={{ borderRight: "1px solid #ccc", pr: 2 }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {comment.author || "Anonymous"}
        </Typography>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {formatDate(comment.createdAt)}
        </Typography>
      </Box>

      <Box flex={1}>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            size="small"
          />
        ) : (
          <Typography variant="body1">{comment.content}</Typography>
        )}
      </Box>
      <Box
        gap={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ marginLeft: "auto" }}
      >
        {isEditing ? (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ width: "100%" }}
              onClick={handleSaveEdit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ width: "100%" }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ width: "100%" }}
            onClick={handleEditMode}
          >
            Edit
          </Button>
        )}
        {!isEditing && (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDeleteComment}
          >
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

export default CommentItem;
