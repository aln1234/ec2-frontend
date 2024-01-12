import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useAppSelector from "../../../hooks/useAppSelector";
import { Box, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useCallback, useMemo, useState } from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductUpdateModal from "./ProductUpdateModal";

interface Column {
  id: "name" | "price" | "category" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Product Name", minWidth: 200 },
  { id: "price", label: "Price", minWidth: 100 },

  {
    id: "category",
    label: "Category",
    minWidth: 150,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
];

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { products } = useAppSelector((state) => state.productReducer);
  const [singleProductId, setSingleProductId] = useState<number>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = useCallback((id: number) => {
    setOpen(true);
    setSingleProductId(id);
  }, []);

  const deleteHandle = useCallback((id: number) => {
    setDeleteOpen(true);
    setSingleProductId(id);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);
  const deleteClose = useCallback(() => setDeleteOpen(false), []);

  const paginatedProducts = useMemo(() => {
    return products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [products, page, rowsPerPage]);
  return (
    <Box sx={{ width: "55rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "2rem" }}>
        Product Table
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.categoryId.name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<EditIcon />}
                        onClick={() => handleOpen(row._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteHandle(row._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ProductUpdateModal
        handleClose={handleClose}
        open={open}
        id={singleProductId}
      />
      <ProductDeleteModal
        handleClose={deleteClose}
        open={deleteOpen}
        id={singleProductId}
      />
    </Box>
  );
}
