import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";

import { cartAdd, cartRemove } from "../redux/reducers/cartReducer";
import Loader from "./Loader";
import { CartItem } from "../types/CartType";
import { toast } from "react-toastify";
import { ShoppingCart } from "@mui/icons-material";
import { createCheckout } from "../api/orderFetch";

type CartProductsType = {
  products: CartItem[];
};

export default function CartSection({ products }: CartProductsType) {
  const { user } = useAppSelector((state) => state.credentialReducer);

  const token = useAppSelector((state) => state.credentialReducer.token);
  const dispatch = useAppDispatch();

  const calculateTotalAmount = useCallback(() => {
    return products.reduce(
      (total, cartItem) => total + cartItem.count * cartItem.price,
      0
    );
  }, [products]);

  const calculateTotalCount = useCallback(() => {
    return products.reduce((total, cartItem) => total + cartItem.count, 0);
  }, [products]);

  const handleAdd = useCallback(
    (product: CartItem) => {
      dispatch(cartAdd({ userEmail: user?.email, products: product }));
    },
    [dispatch, user]
  );
  const handleRemove = useCallback(
    (product: CartItem) => {
      dispatch(cartRemove({ userEmail: user?.email, products: product }));
    },
    [dispatch, user]
  );

  const totalItemCount = useMemo(
    () => calculateTotalCount(),
    [calculateTotalCount]
  );
  const totalAmount = useMemo(
    () => calculateTotalAmount(),
    [calculateTotalAmount]
  );

  const handelCheckout = () => {
    const formattedData: any = {
      cartItems: products,
      userId: user?._id,
      token: token?.accessToken,
    };
    dispatch(createCheckout(formattedData));
  };

  return (
    <Box>
      {products.length === 0 ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ maxHeight: 440 }}>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" color="white">
                    Product
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="h5" color="white">
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" color="white">
                    Quantity
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h5" color="white">
                    Total
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                backgroundColor: "#f5f5f5",
                height: "35px",
              }}
            >
              {products.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <img
                        src={row?.images[0] || row.images[1] || row.images[2]}
                        alt="product description"
                        width={140}
                        height={140}
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />

                      <Typography variant="h6">{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={400}>
                      $ {row.price}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={() => handleAdd(row)}
                      >
                        <AddIcon />
                      </Fab>
                      <input
                        type="number"
                        style={{
                          width: "60px",
                          borderRadius: "14px",
                          border: "1px solid #2980b9",
                          textAlign: "center",
                          fontSize: "1rem",
                        }}
                        value={row.count}
                        disabled
                      />
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        onClick={() => handleRemove(row)}
                      >
                        <RemoveIcon />
                      </Fab>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={500}>
                      ${row.count * row.price}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h5" color="black">
                    Total Item: {totalItemCount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h5" color="black">
                    Total : ${totalAmount}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {token?.accessToken ? (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handelCheckout()}
                    >
                      Checkout
                    </Button>
                  ) : (
                    <Button
                      href="/login"
                      variant="contained"
                      startIcon={<ShoppingCart />}
                    >
                      Login
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
