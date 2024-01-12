import {
  AppBar,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00022e",
    },
    secondary: {
      main: "#fc86aa",
    },
  },
});

function Receipt() {
  const [isOpened, setIsOpened] = useState(false);

  const toggleDrawer = () => {
    setIsOpened(!isOpened);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            ></IconButton>
            <Typography variant="h6">Invoice</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpened}
          className="drawer"
        >
          <Typography variant="h6">Bill to</Typography>
          <Typography variant="body1">Example Customer</Typography>
        </Drawer>
        <main className="main">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Qty.</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Item 1</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">€10.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item 2</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">€5.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item 3</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">€3.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </main>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Invoice number EXAMPLE-0001 - €30.45 due January 9, 2024
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Receipt;
