import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

import { setPriceRange } from "../redux/reducers/productsReducer";

function valuetext(value: number) {
  return `${value}°C`;
}

const PriceRange = () => {
  const { priceRange } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(setPriceRange(newValue as number[]));
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
        Price
      </Typography>
      <Box>
        <Slider
          max={1000}
          min={0}
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    </Box>
  );
};

export default PriceRange;
