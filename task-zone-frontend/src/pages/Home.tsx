import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import LoginMui from "../components/LoginMui";
import SignUpMui from "../components/SignUpMui";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" align="center" width={"100%"}>
        Do you have an account?
      </Typography>

      <Box
        display="flex"
        gap={1}
        justifyContent="space-between"
        sx={{
          flexDirection: {
            xs: "column", // <600px
            sm: "column", // 600-899px
            md: "column", // >=900px
          },
          position: "relative",
          borderRadius: "30px",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          height: {
            xs: "auto",
            md: "50vh",
          },
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            height: "auto",
            background: "#fff",
            color: "#333",
            zIndex: 1,
            transition: {
              xs: "all 0.6s ease-in-out 1.2s",
              md: "all 1.2s ease-in-out 1.2s",
            },
            position: {
              xs: "relative",
              md: "absolute",
            },
            right: {
              xs: "0%",
              md: isActive ? "-50%" : 0,
            },
            top: {
              // xs: "100%",
              xs: isActive ? 0 : "26vh",
              md: "50%",
            },
            transform: { xs: "auto", md: "translateY(-50%)" },
            maxWidth: {
              xs: "100%",
              md: "45vw",
            },
          }}
        >
          <LoginMui />
        </Box>
        <Box
          sx={{
            height: "auto",
            background: "#fff",
            color: "#333",
            zIndex: 1,
            transition: {
              xs: "all 1.2s ease-in-out 1.2s",
              md: "all 1.2s ease-in-out 1.2s",
            },
            position: {
              xs: "relative",
              md: "absolute",
            },
            left: {
              xs: "auto",
              md: isActive ? 0 : "-50%",
            },
            top: {
              xs: isActive ? 0 : "-29vh",
              md: "50%",
            },
            transform: { xs: "auto", md: "translateY(-50%)" },

            maxWidth: {
              xs: "100%",
              md: "45vw",
            },
          }}
        >
          <SignUpMui />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: {
              xs: "220px",
              md: "100%",
            },
            borderRadius: { xs: "20px", md: "150px" },
            overflow: { xs: "hidden", md: "unset" },
            position: "absolute",
            "&::before": {
              content: '""',
              position: "absolute",
              left: { xs: 0, md: "-250%" },
              width: "300%",
              height: "100%",
              background: "#383837",
              borderRadius: { xs: "20px", md: "150px" },
              zIndex: 2,
              transition: "1.8s ease-in-out",
              ...(isActive && { left: { xs: "-200%", md: "50%" } }),
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: { xs: "100%", md: "50%" },
              top: 0,
              height: "100%",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
              transition: "0.6s ease-in-out",
              left: 0,
              transitionDelay: "1.2s",
              ...(isActive && {
                left: { xs: "-100%", md: "-50%" },
                transitionDelay: "0.6s",
              }),
            }}
          >
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginTop: 2,
                backgroundColor: "white",
                borderRadius: 2,
              }}
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: { xs: "100%", md: "50%" },
              top: 0,
              height: "100%",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2,
              transition: "0.6s ease-in-out",
              right: { xs: "-100%", md: "-50%" },
              transitionDelay: "0.6s",
              ...(isActive && { right: 0, transitionDelay: "1.2s" }),
            }}
          >
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                marginTop: 2,
                backgroundColor: "white",
                borderRadius: 2,
              }}
              onClick={() => setIsActive(false)}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
