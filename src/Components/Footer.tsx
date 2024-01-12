import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        marginTop: "16rem",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body1" color="primary.main" align="center">
          {"Copyright © "}
          <Link to="/" style={{ textDecoration: "none" }}>
            Buy
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body1" color="primary.main" align="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            Made for Integrify
          </Link>{" "}
        </Typography>
      </Container>
    </Box>
  );
}
