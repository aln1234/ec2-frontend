import React from "react";
import { HeroDiv, HeroText } from "../Styled/style";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import * as animationData from "../animation/mobile.json";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <HeroDiv>
      <Box
        sx={{
          display: "flex",
          gap: "12rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HeroText>
          <Typography
            variant="h2"
            color="primary"
            sx={{
              fontFamily: "Roboto Condensed",
              fontWeight: "900",
            }}
          >
            Fashion
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto Condensed",
              fontWeight: "900",
              fontSize: { sx: "20px", md: "68px" },
            }}
          >
            Collection 2023
          </Typography>
          <Link to="/products">
            <Button
              sx={{ maxWidth: "60%" }}
              variant="contained"
              color="primary"
            >
              SHOP NOW
            </Button>
          </Link>
        </HeroText>
        <Box>
          <Lottie options={defaultOptions} height={500} width={500} />
        </Box>
      </Box>
    </HeroDiv>
  );
};

export default Hero;
