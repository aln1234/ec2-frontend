import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "24px",
      }}
    >
      <img
        src="https://m3.material.io/static/angular/404-light.caafc6e0327e9785.png"
        alt="Error image description"
        loading="lazy"
        width={650}
      />
      <Typography variant="h3">This Page cannot be found</Typography>
      <Typography variant="subtitle1">
        Try a different destination or head back to <br />
      </Typography>
      <Link to="/">Home Page</Link>
    </Box>
  );
};

export default ErrorPage;
