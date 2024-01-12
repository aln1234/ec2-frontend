import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import useAppSelector from "../../../hooks/useAppSelector";

import Loader from "../../Loader";

import { useMemo } from "react";
import CategoryUpdateForm from "./CategoryUpdateForm";

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
  id?: number | string;
};

export default function CategoryUpdateModal({
  open,
  handleClose,
  id,
}: ModalType) {
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const singleCategory = useMemo(() => {
    return categories.find((category) => category._id === id);
  }, [categories, id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!singleCategory ? (
            <Loader />
          ) : (
            <CategoryUpdateForm category={singleCategory} close={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
