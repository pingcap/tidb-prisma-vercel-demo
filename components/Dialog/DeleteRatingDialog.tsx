import * as React from "react";
import Router from "next/router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

import { BookRatingsProps } from "const";
import { deleteRating } from "lib/http";

type AlertDialogProps = Omit<BookRatingsProps, "user">;

export default function AlertDialog(props: AlertDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const response = await deleteRating(props.bookId, props.userId);
    if (response.error) {
      enqueueSnackbar(`Error: Delete target rating.`, {
        variant: "error",
      });
      setLoading(false);
      handleClose();
      return;
    }
    enqueueSnackbar(`The rating was successfully deleted.`, {
      variant: "success",
    });
    setLoading(false);
    handleClose();
    Router.reload();
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton size="small" onClick={handleClickOpen}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this rating?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation is not reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus disabled={loading}>
            Cancel
          </Button>
          <LoadingButton onClick={handleDelete} color="error" loading={loading}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
