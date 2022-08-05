import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { VariantType, useSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

import { BookDetailProps } from "const";
import { isInDesiredForm } from "lib/utils";
import { updateBookDetails } from "lib/http";

export default function BookInfoFormDialog(props: {
  data: BookDetailProps;
  onSuccess?: (data: BookDetailProps) => void;
}) {
  const { data, onSuccess } = props;

  const [open, setOpen] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [stock, setStock] = React.useState(`${data.stock}`);
  const [stockError, setStockError] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value);
  };

  React.useEffect(() => {
    if (isInDesiredForm(stock)) {
      setStockError(false);
    } else {
      setStockError(true);
    }
  }, [stock]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    const res = await updateBookDetails(data.id, {
      stock: parseInt(stock),
    });
    if (res.error) {
      enqueueSnackbar(`Error: Update book details.`, {
        variant: "error",
      });
      setIsUpdating(false);
      return;
    }
    enqueueSnackbar(`Book details was updated.`, {
      variant: "success",
    });
    res.content?.data && onSuccess && onSuccess(res.content.data);
    setIsUpdating(false);
    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </IconButton>
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Book Info</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="type"
              label="Book Type"
              type="text"
              fullWidth
              variant="standard"
              value={data.type}
              disabled
            />
            <TextField
              margin="dense"
              id="title"
              label="Book Title"
              type="text"
              fullWidth
              variant="standard"
              value={data.title}
              disabled
            />
            <TextField
              margin="dense"
              id="title"
              label="Publication Date"
              type="pub"
              fullWidth
              variant="standard"
              value={data.publishedAt}
              disabled
            />
            <TextField
              autoFocus
              margin="dense"
              id="stock"
              label="In Stock"
              type="text"
              fullWidth
              variant="standard"
              value={stock}
              onChange={handleStockChange}
              error={stockError}
              helperText={stockError ? `Only allow positive integer.` : ""}
            />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={data.price}
                disabled
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isUpdating}>
              Cancel
            </Button>
            <LoadingButton
              onClick={handleUpdate}
              loading={isUpdating}
              disabled={stockError || parseInt(stock) === data.stock}
            >
              Update
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
