import React from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { Fab } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import { toast } from "react-toastify";

type CartButtonProps = {
  product: Product;
};

const CartButton: React.FC<CartButtonProps> = ({ product }) => {
  const { user } = useAppSelector((state) => state.credentialReducer);
  const dispatch = useAppDispatch();

  const addItemToCart = () => {
    if (user) {
      dispatch(
        addToCart({
          userEmail: user?.email,
          products: { ...product, count: 1 },
        })
      );
    } else {
      toast("Please Log In to Add Item");
    }
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      size="small"
      sx={{
        position: "absolute",
        top: "12px",
        zIndex: 2,
        right: "16px",
      }}
      onClick={addItemToCart}
    >
      <ShoppingCartIcon fontSize="small" />
    </Fab>
  );
};

export default CartButton;
