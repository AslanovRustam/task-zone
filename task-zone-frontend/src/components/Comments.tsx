import { Box, List, ListItem } from "@mui/material";
import type { FC } from "react";
import { Comment } from "../types/types";
import CommentItem from "./CommentItem";
import { useSelector } from "react-redux";
import { selectCurrentTask } from "../store/selectors";

interface CommentsProps {
  comments: Comment[];
}

const Comments: FC<CommentsProps> = ({ comments }) => {
  const currentTask = useSelector(selectCurrentTask);
  return (
    <Box sx={{ width: "100%" }}>
      <List>
        {comments.map((comment, idx) => (
          <ListItem
            key={comment.id}
            sx={{
              alignItems: "flex-start",
              gap: 3,
              border: "1px solid #ccc",
              borderRadius: 2,
              mb: 1,
              pb: 1,
              ml: 4,
              mr: 4,
              width: "auto",
              backgroundColor: idx % 2 === 0 ? "#fffff" : "#e7e7e7a4",
            }}
          >
            <CommentItem comment={comment} currentTask={currentTask} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Comments;
