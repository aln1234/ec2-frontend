import { useCallback, useEffect } from "react";

import { Box, Grid, Typography } from "@mui/material";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import ProductCard from "./ProductCard";
import { categoriesFilter } from "../api/productFetch";

const LatestTrends = () => {
  const { products } = useAppSelector((state) => state.productReducer);
  const { priceRange } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const categoriesFilterCallback = useCallback(() => {
    dispatch(
      categoriesFilter({
        offset: 0,
        limit: 20,
        priceRange,
        categoryId: "",
        searchText: "",
      })
    );
  }, [priceRange, dispatch]);

  useEffect(() => {
    categoriesFilterCallback();
  }, [categoriesFilterCallback]);

  const startIndex = Math.floor(Math.random() * 10);
  const endIndex =
    Math.floor(Math.random() * (10 - startIndex)) + startIndex + 4;

  return (
    <Box
      sx={{
        maxWidth: { xs: "90%", md: "90%", margin: "auto" },
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: "roboto", marginTop: "4rem" }}>
        Latest Trends
      </Typography>
      <Grid
        sx={{ flexGrow: 1, cursor: "pointer", marginTop: "4rem" }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="start"
            spacing="2"
          >
            {products.slice(startIndex, endIndex).map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestTrends;
