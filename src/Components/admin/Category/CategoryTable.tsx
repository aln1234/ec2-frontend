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

import { useCallback, useEffect, useMemo, useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";

import { categoriesGet } from "../../../api/productFetch";

import CategoryUpdateModal from "./CategoryUpdateModal";
import CategoryDeleteModal from "./CategoryDelete";

interface Column {
  id: "name" | "image" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Category Name", minWidth: 200 },
  {
    id: "image",
    label: "Image",
    minWidth: 150,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

export default function CategoryTable() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const [singleCategoryId, setSingleCategoryId] = useState<string>();
  const dispatch = useAppDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(categoriesGet());
  }, [open, deleteOpen, dispatch]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = useCallback((id: string) => {
    setSingleCategoryId(id);
    setOpen(true);
  }, []);

  const deleteHandle = useCallback((id: string) => {
    setDeleteOpen(true);
    setSingleCategoryId(id);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);
  const deleteClose = useCallback(() => setDeleteOpen(false), []);

  const paginatedCategories = useMemo(() => {
    return categories.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [categories, page, rowsPerPage]);

  return (
    <Box sx={{ width: "55rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "2rem" }}>
        Category Table
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
            {paginatedCategories.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt="The house from the offer."
                      src={row.image}
                    />
                  </TableCell>
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
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <CategoryUpdateModal
        handleClose={handleClose}
        open={open}
        id={singleCategoryId}
      />
      <CategoryDeleteModal
        handleClose={deleteClose}
        open={deleteOpen}
        id={singleCategoryId}
      />
    </Box>
  );
}
