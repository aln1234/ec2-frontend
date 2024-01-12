import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useRef } from "react";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { useReactToPrint } from "react-to-print";

const SingleOrder = () => {
  const { id } = useParams();
  const { orders } = useAppSelector((state) => state.orderReducer);
  const componentRef = useRef<HTMLDivElement>(null); // <-- initialize with
  const singleOrder =
    orders && orders.find((order: { _id: any }) => order._id === id);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Box sx={{ marginLeft: "18rem", maxWidth: "70%", paddingTop: "6rem" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" align="center">
          Thank you. Your order has been received.
        </Typography>
        <Button variant="contained" size="medium" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      <Grid
        component="div"
        container
        spacing={3}
        sx={{ paddingTop: "4rem", gap: "2rem" }}
        ref={componentRef}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundColor: "#F4F4F4",
            padding: "4rem",
          }}
        >
          <Typography variant="h6">Order Info</Typography>
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="body1">
              Order Number: {singleOrder._id}
            </Typography>
            <Typography variant="body1">Email: {singleOrder.email}</Typography>
            <Typography variant="body1">Name: {singleOrder.name}</Typography>
            <Typography variant="body1">Phone: {singleOrder.phone}</Typography>
            <Typography variant="body1">
              Total: $ {singleOrder.total / 100}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundColor: "#F4F4F4",
            padding: "4rem",
          }}
        >
          <Typography variant="h6">Billing Address</Typography>
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="body1">
              City: {singleOrder.address.city}
            </Typography>
            <Typography variant="body1">
              Country: {singleOrder.address.country}
            </Typography>
            <Typography variant="body1">
              Postal Code: {singleOrder.address.postalCode}
            </Typography>
            <Typography variant="body1">
              Payment Type: {singleOrder?.payment?.payment_type?.toUpperCase()}
            </Typography>
            <Typography variant="body1">
              Payment Status:{" "}
              {singleOrder?.payment?.payment_status?.toUpperCase()}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            backgroundColor: "#F4F4F4",
            padding: "4rem",
          }}
        >
          <Typography variant="h6">Shipping Address</Typography>
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="body1">
              City: {singleOrder.address.city}
            </Typography>
            <Typography variant="body1">
              Country: {singleOrder.address.country}
            </Typography>
            <Typography variant="body1">
              Postal Code: {singleOrder.address.postalCode}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            backgroundColor: "#F4F4F4",
            padding: "4rem",
          }}
        >
          <Typography variant="h6">Order Details</Typography>
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Divider light variant="middle" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell> Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {singleOrder.products.map((row: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.quantity}
                      </TableCell>
                      <TableCell>{row.amount_total / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleOrder;
