import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import useAppSelector from "../hooks/useAppSelector";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import CartButton from "./CartButton";

const CardItem = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  position: "relative",
  overflow: "clip",
}));

export default function CategoryCard() {
  const { products, loading } = useAppSelector((state) => state.productReducer);
  const { offset } = useAppSelector((state) => state.productReducer);
  const { limit } = useAppSelector((state) => state.productReducer);
  const indexOfLastPost = offset * limit;
  const indexOfFirstPost = indexOfLastPost - limit;

  const filteredProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Box>
      {loading && <Loader />}
      {filteredProducts && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filteredProducts.map((product) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={product._id}
                sx={{ borderShadow: "none" }}
              >
                <CardItem sx={{ postion: "relative" }}>
                  <Link to={`${product._id}`}>
                    <Box
                      component="img"
                      src={
                        product?.images[0] ||
                        product.images[1] ||
                        product.images[2]
                      }
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
                  </Link>
                  <CartButton product={product} />
                </CardItem>
                <Link to={`${product._id}`}>
                  <Typography variant="h6"> {product.name}</Typography>
                  <Typography variant="h6" fontWeight={600}>
                    $ {product.price}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
