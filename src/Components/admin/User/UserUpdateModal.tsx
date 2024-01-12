import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import useAppSelector from "../../../hooks/useAppSelector";

import Loader from "../../Loader";

import { useMemo } from "react";
import UserUpdate from "./UserUpdate";

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

export default function UserUpdateModal({ open, handleClose, id }: ModalType) {
  const { users } = useAppSelector((state) => state.credentialReducer);

  const singleUser = useMemo(() => {
    return users.find((user) => user._id === id);
  }, [users, id]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!singleUser ? (
            <Loader />
          ) : (
            <UserUpdate user={singleUser} close={handleClose} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
