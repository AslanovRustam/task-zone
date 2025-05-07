import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { signInUser } from "../store/user/operations";

function SignUp() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const resultAction = await dispatch(signInUser(formData)).unwrap();
      if (resultAction) {
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        width={"100%"}
        color="secondary"
      >
        Sign-Up
      </Typography>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          name="username"
          label="Name"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
      </Box>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
        disabled={formData.password === "" || formData.username === ""}
      >
        Sign-Up
      </Button>
    </div>
  );
}

export default SignUp;
