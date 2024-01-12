import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const SummaryInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ backgroundColor: "primary.main", padding: "1rem 6rem" }}
        variant="h5"
        color="white"
      >
        Summary
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <Typography variant="h6" color="black">
          Total Items :
        </Typography>
        <Divider variant="fullWidth" />
        <Typography variant="h6" color="black">
          Total Amount :
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryInfo;
