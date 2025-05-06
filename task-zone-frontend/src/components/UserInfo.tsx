import { Avatar, Box, Typography } from "@mui/material";
import defautltAvatar from "../assets/avatarDefault.png";

type Props = {
  toggleUserModal: () => void;
  userName: string;
  userAvatar?: string;
};

export default function UserInfo({
  toggleUserModal,
  userName,
  userAvatar,
}: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      justifyContent="flex-end"
      sx={{ cursor: "pointer" }}
      onClick={toggleUserModal}
    >
      <Typography variant="body1">
        Hi <strong>{userName}</strong>
      </Typography>

      <Avatar
        alt={userName}
        src={userAvatar ? `http://localhost:3000${userAvatar}` : defautltAvatar}
      />
    </Box>
  );
}
