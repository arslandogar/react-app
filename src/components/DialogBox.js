import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DialogBox(props) {
  const { isOpen, resetForm, username } = props;

  const [open, setOpen] = React.useState(isOpen);
  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  function handleClose() {
    setOpen(false);
    resetForm();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
        <DialogContent>
          Welcome, {username}! You have successfully signed up!
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
