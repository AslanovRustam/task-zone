import { ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AppDispatch } from "../store";
import { loginUser } from "../store/user/operations";
import { selectIsAuthenticated } from "../store/selectors";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const isAuthenticated = useSelector(selectIsAuthenticated);
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
      const resultAction = await dispatch(loginUser(formData)).unwrap();
      if (resultAction) {
        navigate("/tasks");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        width={"100%"}
        color="primary"
      >
        Login
      </Typography>
      {isAuthenticated ? (
        <Navigate to="/tasks" replace />
      ) : (
        <div>
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
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={formData.password === "" || formData.username === ""}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
}

export default Login;
