import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { AppDispatch } from "../store";
import { loginUser } from "../store/user/operations";
import { toast } from "react-toastify";
import { selectIsAuthenticated } from "../store/selectors";

type Props = {};

function Login({}: Props) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      dispatch(loginUser(formData));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      navigate("/tasks");
    }
  };

  return (
    <>
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
