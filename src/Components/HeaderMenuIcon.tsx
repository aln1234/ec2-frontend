import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { CartItem } from "../types/CartType";

type HeaderType = {
  products: CartItem[];
};

export default function HeaderMenuCart({ products }: HeaderType): JSX.Element {
  return (
    <IconButton size="large" aria-label="show catrs items" color="inherit">
      <Badge badgeContent={products?.length} color="info">
        <ShoppingCartIcon color="primary" />
      </Badge>
    </IconButton>
  );
}
