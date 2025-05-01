import { NavLink } from "react-router";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" align="center" width={"100%"}>
        Do you have an account?
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ mt: 2, padding: 0 }}
        >
          <NavLink
            to={"auth/signup"}
            style={{
              padding: "8px 12px",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Sign-Up
          </NavLink>
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ mt: 2, padding: 0 }}
        >
          <NavLink
            to={"auth/login"}
            style={{
              padding: "8px 12px",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            login
          </NavLink>
        </Button>
      </Box>
    </div>
  );
}
