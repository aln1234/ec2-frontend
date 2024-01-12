import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

import { singleProductGet } from "../api/productFetch";
import Loader from "../Components/Loader";
import { Product } from "../types/Product";
import { addToCart } from "../redux/reducers/cartReducer";
import ErrorPage from "./ErrorPage";
import ImageSlide from "../Components/ImageSlide";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.credentialReducer);

  const { singleProduct, loading, error } = useAppSelector(
    (state) => state.singleProductReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(singleProductGet(id));
    }
  }, [id, dispatch]);

  const addItemCart = (products: Product) => {
    if (products && user) {
      dispatch(
        addToCart({
          userEmail: user?.email,
          products: { ...products, count: 1 },
        })
      );
    } else {
      toast("Please Log In to Add Item");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: "80%",
            margin: "auto",
            marginTop: "12rem",
          }}
        >
          {error ? (
            <ErrorPage />
          ) : (
            <Grid container spacing={6}>
              <Grid item xs={7}>
                <ImageSlide images={singleProduct?.images} />
              </Grid>
              <Grid
                item
                xs={5}
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {singleProduct?.name}
                </Typography>
                <Typography variant="h5" fontWeight={600} color="primary">
                  ${singleProduct?.price}
                </Typography>
                <Typography variant="h6">
                  Category:{" "}
                  <span style={{ color: "#297FB7" }}>
                    {singleProduct?.categoryId?.name}
                  </span>
                </Typography>
                <Typography variant="h6">
                  Stock:{" "}
                  <span style={{ color: "#297FB7" }}>
                    {singleProduct?.stock}
                  </span>
                </Typography>
                <Divider />
                <Typography variant="body1">
                  {singleProduct?.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    maxWidth: "40%",
                    borderRadius: "40px",
                    padding: "0.8rem",
                    marginTop: "1rem",
                  }}
                  onClick={() => addItemCart(singleProduct as Product)}
                >
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default SingleProduct;
