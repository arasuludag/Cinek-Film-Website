import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import parse from "html-react-parser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setText(props.text); // This seems pointless but NextJS was acting up. This is how I fixed it.
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ color: "white", margin: "0 auto", display: "flex" }}
        onClick={handleClickOpen}
      >
        Daha Fazla
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.name}</DialogTitle>
        <DialogContent>
          <p>{parse(text)}</p>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "white" }} onClick={handleClose}>
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
