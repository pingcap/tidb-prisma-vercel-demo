import * as React from 'react';
import { useSnackbar } from 'notistack';
import NextRouter from 'next/router';

import { deleteRating } from 'lib/http';

export interface BookRatingDeleteDialog {
  bookId: string;
  userId: string;
}

const BookRatingDeleteDialog = React.forwardRef(
  (props: BookRatingDeleteDialog, ref: any) => {
    const { bookId, userId } = props;
    const [loading, setLoading] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
      ref?.current?.close();
    };

    const handleDelete = async (e: any) => {
      e.preventDefault();

      setLoading(true);
      const response = await deleteRating(props.bookId, props.userId);
      if (response.error) {
        enqueueSnackbar(`Error: Delete target rating.`, {
          variant: 'error',
        });
        setLoading(false);
        handleClose();
        return;
      }
      enqueueSnackbar(`The rating was successfully deleted.`, {
        variant: 'success',
      });
      setLoading(false);
      handleClose();
      NextRouter.reload();
    };

    return (
      <dialog id={userId} className='modal' ref={ref}>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>
            Delete this rating?{`[userID: ${userId}]`}
          </h3>
          <p className='py-4'>This operation is not reversible.</p>

          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Cancel</button>
            <button
              className='btn btn-error'
              disabled={loading}
              onClick={handleDelete}
            >
              {loading && <span className='loading loading-spinner' />}
              Delete
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

BookRatingDeleteDialog.displayName = 'BookRatingDeleteDialog';

export default BookRatingDeleteDialog;
