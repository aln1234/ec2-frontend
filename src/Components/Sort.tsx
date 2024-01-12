import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

import { setLimit, sortByPrice } from "../redux/reducers/productsReducer";

const Sort = () => {
  const dispatch = useAppDispatch();
  const { limit } = useAppSelector((state) => state.productReducer);
  const [price, setPrice] = useState<string>();

  const handleRowChange = (event: SelectChangeEvent) => {
    dispatch(setLimit(Number(event.target.value)));
  };

  const handlePriceChange = (event: SelectChangeEvent) => {
    dispatch(sortByPrice(event.target.value));
    setPrice(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Products
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Rows</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={limit.toString()}
              label="rows"
              onChange={handleRowChange}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Price</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={price}
              label="rows"
              onChange={handlePriceChange}
            >
              <MenuItem value="asc">Cheapest</MenuItem>
              <MenuItem value="dsc">Expensive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Sort;
