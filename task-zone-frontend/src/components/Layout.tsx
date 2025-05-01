import { Box, Button, Typography } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AppDispatch } from "../store";
import { logout } from "../store/user/userSlice";
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUserName,
} from "../store/selectors";
import Navbar from "./Navbar";
import { Loader } from "./Loader/Loader";

export default function Layout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent="flex-end"
          sx={{ mb: 2 }}
        >
          <Typography variant="body1">
            Hi <strong>{userName}</strong>
          </Typography>
          <Button type="button" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Navbar />
      )}
      {isLoading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </div>
  );
}
