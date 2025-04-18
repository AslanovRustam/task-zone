import Button from "@mui/material/Button";
import { PATH } from "../constants";

export default function Home() {
  return (
    <div>
      <Button variant="contained" color="primaryNew" href={PATH.TASKS}>
        <span>Go to tasks</span>
      </Button>
    </div>
  );
}
