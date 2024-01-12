import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { useCallback, useEffect } from "react";

import { categoriesFilter } from "../api/productFetch";
import Category from "../Components/Category";
import Search from "../Components/Search";
import Sort from "../Components/Sort";
import ProductPagination from "../Components/ProductPagination";
import ResponsiveGrid from "../Components/CategoryCard";
import PriceRange from "../Components/PriceRange";
import { setOffset } from "../redux/reducers/productsReducer";

const ProductCategory = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

export default function Products() {
  const { categoryId } = useAppSelector((state) => state.categoryReducer);
  const { searchText } = useAppSelector((state) => state.productReducer);
  const { priceRange } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(() => {
    dispatch(
      categoriesFilter({
        priceRange,
        limit: 0,
        offset: 0,
        categoryId,
        searchText: searchText,
      })
    );
    dispatch(setOffset(1));
  }, [searchText, categoryId, priceRange, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: "90%", margin: "auto", marginTop: "12rem" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <ProductCategory>
            <Search />
            <PriceRange />
            <Category />
          </ProductCategory>
        </Grid>
        <Grid item xs={9}>
          <ProductCategory>
            <Sort />
            <ResponsiveGrid />
          </ProductCategory>
          <ProductPagination />
        </Grid>
      </Grid>
    </Box>
  );
}
