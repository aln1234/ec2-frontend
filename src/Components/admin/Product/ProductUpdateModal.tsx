import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import useAppSelector from "../../../hooks/useAppSelector";

import Loader from "../../Loader";
import ProductUpdateForm from "./ProductUpdateForm";
import { useMemo } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  p: 4,
};

type ModalType = {
  handleClose: () => void;
  open: boolean;
  id?: number;
};

export default function ProductUpdateModal({
  open,
  handleClose,
  id,
}: ModalType) {
  const { products } = useAppSelector((state) => state.productReducer);
  // Use useMemo to memoize the singleProduct data
  const singleProduct = useMemo(() => {
    return products.find((product) => product._id === id);
  }, [products, id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!singleProduct ? (
            <Loader />
          ) : (
            <ProductUpdateForm product={singleProduct} close={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
