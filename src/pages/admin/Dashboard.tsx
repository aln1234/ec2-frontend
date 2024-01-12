import React from "react";
import { Box } from "@mui/material";

import DashboardDrawer from "../../Components/DashboardDrawer";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "80%",
        margin: "auto",
      }}
    >
      <DashboardDrawer />
    </Box>
  );
};

export default Dashboard;
