import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { categoriesGet } from "../api/productFetch";
import { setCategoryId } from "../redux/reducers/categoryReducer";
import Loader from "./Loader";

const Category = () => {
  const { categoryId } = useAppSelector((state) => state.categoryReducer);

  const { categories, loading } = useAppSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(categoriesGet());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = (event.target as HTMLInputElement).value;

    dispatch(setCategoryId(categoryId));
  };
  return (
    <>
      {" "}
      {!loading && <Loader />}
      <Box
        sx={{
          padding: "1rem",
          color: "white",
          height: "60vh",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "primary.main",
            padding: "1rem",
            color: "white",
            position: "static",
          }}
        >
          Categories
        </Typography>

        {categories && (
          <FormControl
            sx={{
              paddingLeft: "2rem",
              color: "black",
            }}
          >
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={categoryId}
              onChange={handleChange}
            >
              <FormControlLabel value="" control={<Radio />} label="All" />
              {categories.map((category) => (
                <FormControlLabel
                  key={category._id}
                  value={category._id}
                  control={<Radio />}
                  label={category.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>
    </>
  );
};

export default Category;
