import { Box, Button } from "@mui/material";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { AppDispatch } from "../store";
import { logout } from "../store/user/userSlice";
import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUserAvatar,
  selectUserName,
} from "../store/selectors";
import Navbar from "./Navbar";
import { Loader } from "./Loader/Loader";
import TaskModal from "./TaskModal";
import UserUpdate from "./UserUpdate";
import UserInfo from "./UserInfo";
// import ErrorCmp from "./ErrorCmp";

export default function Layout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const isLoading = useSelector(selectIsLoading);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (): void => {
    dispatch(logout());
  };

  const toggleUserModal = (): void => {
    setOpenUserModal(!openUserModal);
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
          <UserInfo
            toggleUserModal={toggleUserModal}
            userName={userName || ""}
            userAvatar={userAvatar}
          />
          <Button type="button" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Navbar />
      )}
      {isLoading && <Loader />}
      {/* <ErrorCmp /> */}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <ToastContainer />
      <TaskModal open={openUserModal} onClose={toggleUserModal}>
        <UserUpdate onClose={toggleUserModal} userAvatar={userAvatar} />
      </TaskModal>
    </div>
  );
}
