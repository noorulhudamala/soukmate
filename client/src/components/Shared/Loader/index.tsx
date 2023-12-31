import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {
  open: boolean;
  setOpen: Function;
};
const Loader = ({ open, setOpen }: LoaderProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
