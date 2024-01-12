import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import useAppDispatch from "../../../hooks/useAppDispatch";

import Modal from "@mui/material/Modal";

import { categoriesFilter, deleteProduct } from "../../../api/productFetch";
import useAppSelector from "../../../hooks/useAppSelector";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",
};

type ModalType = {
  handleClose: () => void;
  open: boolean;
  id?: number;
};

export default function ProductDeleteModal({
  open,
  handleClose,
  id,
}: ModalType) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.credentialReducer.token);
  useEffect(() => {
    dispatch(
      categoriesFilter({
        limit: 0,
        offset: 0,
        categoryId: "",
        searchText: "",
      })
    );
  }, [open]);

  const handleYes = () => {
    if (id) {
      const data = {
        id: id,
        token: token?.accessToken,
      };

      dispatch(deleteProduct(data));
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" variant="h5">
            Are you sure you want to delete !
          </Typography>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Button variant="contained" onClick={handleYes}>
              Yes
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
