import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";

import RegisterForm from "../Components/RegisterForm";

const Register = () => {
  const { createSuccess } = useAppSelector((state) => state.credentialReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (createSuccess) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [createSuccess, navigate]);
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
          Already A Member
        </Typography>
        <Typography
          variant="h6"
          color="white"
          fontWeight={500}
          sx={{ maxWidth: "70%", textAlign: "center" }}
        >
          With membership you will find attractive deals and offer
        </Typography>
        <Link to="/login">
          <Button
            variant="outlined"
            sx={{
              color: "white",
              border: "1px solid white",
              borderRadius: "30px",
            }}
          >
            Login
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "6rem",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Welcome Back !
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Please SignIn
          <RegisterForm />
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
