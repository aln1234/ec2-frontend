import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import useAppDispatch from "../hooks/useAppDispatch";

import SearchIcon from "@mui/icons-material/Search";

import { setSearchText } from "../redux/reducers/productsReducer";

const Search = () => {
  const dispatch = useAppDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { target } = event;
    dispatch(setSearchText(target.value));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "primary.main",
          padding: "1rem",
          color: "white",
        }}
      >
        Search
      </Typography>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Search;
