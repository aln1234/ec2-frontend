import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect, useMemo, useState } from "react";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { getOrderById } from "../api/orderFetch";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/reducers/cartReducer";
import { persistor } from "../redux/store";

interface Column {
  id: "fullName" | "email" | "phone" | "total" | "status" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "fullName", label: "Full Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 120,
  },
  {
    id: "total",
    label: "Total Amount",
    minWidth: 120,
  },
  {
    id: "status",
    label: "Payment Status",
    minWidth: 120,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 120,
  },
];

export default function OrderTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const { user } = useAppSelector((state) => state.credentialReducer);
  const token = useAppSelector((state) => state.credentialReducer.token);
  const [orderId, setOrderId] = useState<string>();
  const { orders } = useAppSelector((state) => state.orderReducer);
  const dispatch = useAppDispatch();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const formattedData = {
      token: token?.accessToken,
      userId: user?._id,
    };
    if (token) {
      dispatch(getOrderById(formattedData));
    }
  }, [dispatch, token, user?._id]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const paginatedOrders = useMemo(() => {
    return orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [orders, page, rowsPerPage]);

  const handleOpen = React.useCallback((id: string) => {
    setOrderId(id);
  }, []);

  const prevLengthRef = React.useRef(orders.length);

  useEffect(() => {
    const currLength = orders.length;
    if (currLength > prevLengthRef.current) {
      dispatch(clearCart());
      persistor.purge();
    } else if (currLength === prevLengthRef.current) {
      console.log("No new order.");
    } else {
      console.log("An order has been removed.");
    }

    prevLengthRef.current = currLength;
  }, [dispatch, orders]);

  return (
    <Box sx={{ margin: "auto", maxWidth: "80%", paddingTop: "6rem" }}>
      <Typography variant="h5" align="center" style={{ fontWeight: "bold" }}>
        Order Table
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
            {paginatedOrders?.map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{`${row?.name}`}</TableCell>
                  <TableCell>{row?.email}</TableCell>

                  <TableCell>{row?.phone}</TableCell>
                  <TableCell>$ {row?.total / 100}</TableCell>
                  <TableCell>
                    {row?.payment?.payment_status?.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Link to={`${row._id}`}>
                        <Button
                          variant="contained"
                          size="small"
                          endIcon={<EditIcon />}
                          onClick={() => handleOpen(row._id.toString())}
                        >
                          View
                        </Button>
                      </Link>
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
