import { SingleProduct } from "../Styled/style";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { Product } from "../types/Product";
import CartButton from "./CartButton";

type ProductType = {
  product: Product;
};

export default function ProductCard({ product }: ProductType) {
  return (
    <SingleProduct>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: { xs: "16rem", md: "25rem" },
          height: { xs: "12rem", md: "40vh" },
          borderRadius: "1rem",
        }}
      >
        <Link to={`products/${product._id}`}>
          <Box
            component="img"
            src={product?.images[0] || product.images[1] || product.images[2]}
            alt="product image"
            sx={{
              objectFit: "cover",
              width: "30rem",
              height: "40vh",
              position: "relative",

              "&:hover": {
                opacity: 0.5,
                transform: "scale(1.04)",
                transition: "transform 0.5s ease-in-out",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: "0",
              zIndex: "2",
              left: "10%",
              right: "0",
              backgroundColor: "rgba(44, 62, 80,0.4)",
              marginLeft: { xs: "-3rem", md: "-3rem" },

              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" color="white">
              {product.name}
            </Typography>
            <Typography variant="h6" color="white" fontWeight={700}>
              $ {product.price}
            </Typography>
          </Box>
        </Link>
        <CartButton product={product} />
      </Box>
    </SingleProduct>
  );
}
