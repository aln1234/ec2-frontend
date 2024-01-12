import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../Components/LoginForm";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "70%",
        justifyContent: "center",
        marginTop: "4rem",
        marginLeft: "12rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(41, 128, 185)",
          backgroundImage:
            "linear-gradient(90deg, rgba(41,128,185,1) 0%, rgba(52,152,219,1) 100%);",
          height: "35rem",
          gap: "2rem",
        }}
      >
        <Typography variant="h5" color="white" fontWeight={600}>
          New to our shop ?
        </Typography>
        <Typography
          variant="h6"
          color="white"
          fontWeight={500}
          sx={{ maxWidth: "70%", textAlign: "center" }}
        >
          Need to buy new and fresh product. Remember us for fresh and new
          product
        </Typography>
        <Link to="/register">
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: "1px solid white",
              borderRadius: "30px",
            }}
          >
            Create an account
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "6rem",
          marginTop: "4rem",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Welcome Back !
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Please SignIn
          <LoginForm />
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
