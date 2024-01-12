import React, { useMemo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

import { setOffset } from "../redux/reducers/productsReducer";

export default function ProductPagination() {
  const { offset } = useAppSelector((state) => state.productReducer);
  const { limit } = useAppSelector((state) => state.productReducer);
  const { pageNumber } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setOffset(value));
  };

  const pageNumbers = useMemo(() => {
    const numPages = Math.ceil(pageNumber / Number(limit));
    return Array.from({ length: numPages }, (_, index) => index + 1);
  }, [pageNumber, limit]);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageNumbers.length}
        page={Number(offset)}
        onChange={handleChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      />
    </Stack>
  );
}
