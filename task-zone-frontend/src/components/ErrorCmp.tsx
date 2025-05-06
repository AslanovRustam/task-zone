import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { selectIsError } from "../store/selectors";

export default function ErrorCmp() {
  const errors = useSelector(selectIsError);
  const [open, setOpen] = useState(true);

  const errorList = Object.entries(errors).filter(([_, value]) => value);

  if (errorList.length === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        maxWidth: "98vw",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {errorList.map(([sliceName, message]) => (
            <div key={sliceName}>
              <strong style={{ textTransform: "uppercase" }}>
                {sliceName}
              </strong>
              : {message}
            </div>
          ))}
        </Alert>
      </Collapse>
    </Box>
  );
}
