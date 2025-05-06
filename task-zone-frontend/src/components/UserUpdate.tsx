import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Avatar, Typography, useTheme } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { AppDispatch } from "../store";
import { updateUser } from "../store/user/operations";

type Props = {
  onClose: () => void;
  userAvatar?: string;
};

export default function UserUpdate({ onClose, userAvatar }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();

  const handleFile = (file: File) => {
    setAvatarFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarUpdate = async () => {
    if (!avatarFile) return;
    try {
      dispatch(updateUser({ file: avatarFile }));
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      position="relative"
    >
      <Typography variant="h6">Avatar update</Typography>

      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? theme.palette.primary.main : "grey.400",
          padding: 1,
          borderRadius: "50%",
          width: 110,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "border-color 0.3s ease",
        }}
      >
        <Avatar
          src={`http://localhost:3000${userAvatar}` || undefined}
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <Button variant="outlined" onClick={handleButtonClick}>
        FILE SELECT
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Button variant="contained" color="primary" onClick={handleAvatarUpdate}>
        Save
      </Button>
      <CancelOutlinedIcon
        sx={{
          position: "absolute",
          right: -20,
          top: -20,
          cursor: "pointer",
          color: "grey.600",
          transition: "color 0.3s ease",
          "&:hover": {
            color: "red",
          },
        }}
        onClick={onClose}
      />
    </Box>
  );
}
