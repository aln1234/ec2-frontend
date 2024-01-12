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

import UserUpdateModal from "./UserUpdateModal";
import UserDeleteModal from "./UserDelete";

interface Column {
  id: "fullName" | "email" | "avatar" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "fullName", label: "Full Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "avatar",
    label: "Avatar",
    minWidth: 120,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 120,
  },
];

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useAppSelector((state) => state.credentialReducer);
  const { users } = useAppSelector((state) => state.credentialReducer);
  const [singleUserId, setSingleUserId] = useState<string>();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = useCallback((id: string) => {
    setSingleUserId(id);
    setOpen(true);
  }, []);

  const deleteHandle = useCallback((id: string) => {
    setDeleteOpen(true);
    setSingleUserId(id);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);
  const deleteClose = useCallback(() => setDeleteOpen(false), []);
  const paginatedUsers =
    users &&
    users
      .filter((p) => (p.email as string) !== user?.email)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "55rem" }}>
      <Typography variant="h5" align="center" sx={{ paddingBottom: "2rem" }}>
        User Table
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
            {paginatedUsers?.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{`${row?.firstName} ${row.lastName}`}</TableCell>
                  <TableCell>{row?.email}</TableCell>

                  <TableCell>
                    <Box
                      component="img"
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      alt="The house from the offer."
                      src={row.avatar}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<EditIcon />}
                        onClick={() => handleOpen(row._id.toString())}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteHandle(row._id.toString())}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <UserUpdateModal
        handleClose={handleClose}
        open={open}
        id={singleUserId}
      />
      <UserDeleteModal
        handleClose={deleteClose}
        open={deleteOpen}
        id={singleUserId}
      />
    </Box>
  );
}
