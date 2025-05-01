import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState, type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { addComment } from "../store/task/operations";
import { selectIsLoading, selectUserName } from "../store/selectors";
import { Loader } from "./Loader/Loader";

interface AddCommentProps {
  onClose: () => void;
  id: string;
}

interface IComment {
  author: string;
  content: string;
  taskId: string;
}

const AddComment: FC<AddCommentProps> = ({ onClose, id }) => {
  const userName = useSelector(selectUserName);
  const [comment, setComment] = useState<IComment>({
    author: userName || "",
    content: "",
    taskId: id,
  });
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value }: { name: string; value: string } = e.target;

    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (comment.content === "") {
      toast.error("Please, leave the comment");
      return;
    }
    try {
      await dispatch(addComment(comment));
      toast.success("Commit added successfully");
    } catch (e) {
      toast.error("Failed to commit");
    } finally {
      onClose();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <TextField
        label="Author"
        value={comment.author}
        name="author"
        onChange={handleInputChange}
        fullWidth
        disabled
      />
      <TextField
        label="Leave your comment"
        value={comment.content}
        name="content"
        onChange={handleInputChange}
        fullWidth
      />
      <Box display="flex" justifyContent="space-evenly" gap={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          Leave the comment
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default AddComment;
