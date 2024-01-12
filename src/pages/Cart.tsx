import { Box, Grid } from "@mui/material";
import React from "react";

import CartSection from "../Components/CartSection";
import useAppSelector from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const email = useAppSelector(
    (state) => state.credentialReducer.user?.email || ""
  );

  const cartState = useAppSelector((state) => {
    return state.cartReducer.carts;
  });
  const userIndex: number = cartState.findIndex(function (c) {
    return c.userEmail === email;
  });

  const products = userIndex === -1 ? [] : cartState[userIndex].products;

  const navigate = useNavigate();

  if (products.length === 0) {
    toast("Cart is empty");
    setTimeout(() => {
      return navigate("/");
    }, 50);
  }

  return (
    <Box
      sx={{
        flexGrow: 1,

        maxWidth: "80%",
        margin: "auto",
        marginTop: "4rem",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={9} md={12}>
          {products.length > 0 && <CartSection products={products} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
