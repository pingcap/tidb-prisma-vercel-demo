import * as React from 'react';
import { useSnackbar } from 'notistack';
import NextRouter from 'next/router';

import { addRatingByBookID } from 'lib/http';
import HalfRating from 'components/v2/Rating/HalfRating';

export interface BookAddRatingDialog {
  bookId: string;
}

const BookAddRatingDialog = React.forwardRef(
  (props: BookAddRatingDialog, ref: any) => {
    const { bookId } = props;
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState<number | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (newValue: number | null) => {
      setValue(newValue);
    };

    const handleClose = () => {
      ref?.current?.close();
    };

    const handleAdd = async (e: any) => {
      e.preventDefault();

      setLoading(true);
      const response = await addRatingByBookID(props.bookId, {
        score: value as number,
      });
      if (response.error) {
        enqueueSnackbar(`Error: Add rating.`, {
          variant: 'error',
        });
        setLoading(false);
        handleClose();
        return;
      }
      enqueueSnackbar(`The rating was successfully added.`, {
        variant: 'success',
      });
      setLoading(false);
      handleClose();
      NextRouter.reload();
    };

    return (
      <dialog id={bookId} className='modal' ref={ref}>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg pb-6'>Add Rating</h3>
          <HalfRating onChange={handleChange} />
          <span className='pl-2'>{value}</span>

          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn'>Cancel</button>
            <button
              className='btn btn-error'
              disabled={loading || !value}
              onClick={handleAdd}
            >
              {loading && <span className='loading loading-spinner' />}
              Save
            </button>
          </div>
        </form>
      </dialog>
    );
  }
);

BookAddRatingDialog.displayName = 'BookAddRatingDialog';

export default BookAddRatingDialog;
