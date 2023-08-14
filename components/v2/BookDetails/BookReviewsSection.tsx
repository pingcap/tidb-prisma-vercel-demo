import * as React from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import { bookDetailsIdState } from 'atoms';
import { bookRatingQuery } from 'selectors';
import { BookRatingsProps, starLabels } from 'const';
import { roundHalf } from 'lib/utils';
import HalfRating from 'components/v2/Rating/HalfRating';
import BookRatingDeleteDialog from 'components/v2/BookDetails/BookRatingDeleteDialog';
import BookAddRatingDialog from 'components/v2/BookDetails/BookAddRatingDialog';

export default function BookReviewsSection() {
  const addRatingDialogRef = React.useRef<HTMLDialogElement>(null);

  const bookRatingLoadable = useRecoilValueLoadable(bookRatingQuery);
  const [bookDetailsId] = useRecoilState(bookDetailsIdState);

  switch (bookRatingLoadable.state) {
    case 'hasValue':
      const data = bookRatingLoadable.contents.content;
      return (
        <>
          <div className='hero h-auto justify-start mt-6'>
            <div className='hero-content items-start'>
              <div className='max-w-md'>
                <h2 className='text-3xl font-bold'>Customer Reviews</h2>
                <p className='py-6'>
                  <ReviewOverview content={data.content} />
                </p>
                <button
                  className='btn btn-info'
                  onClick={() => {
                    addRatingDialogRef?.current?.showModal();
                  }}
                >
                  Add Review
                </button>
              </div>
              <div className='overflow-x-auto mt-16'>
                {data?.content?.length > 0 && (
                  <ReviewsTable content={data.content} bookId={bookDetailsId} />
                )}
              </div>
            </div>
          </div>
          <BookAddRatingDialog
            bookId={bookDetailsId}
            ref={addRatingDialogRef}
          />
        </>
      );
    case 'loading':
      return (
        <>
          <div className='flex items-center justify-center mt-6'>
            <span className='loading loading-bars loading-lg'></span>
          </div>
        </>
      );
    case 'hasError':
      // throw bookRatingLodable.contents;
      return <></>;
  }
}

const ReviewOverview = (props: { content: BookRatingsProps[] }) => {
  const num = props.content.length;
  const sum = props.content.reduce((prev, item) => {
    return prev + item.score;
  }, 0);
  const avg = sum / num;
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center py-2'>
        <HalfRating disabled rating={avg} />
        <div className='ml-2'>{starLabels[roundHalf(avg)]}</div>
      </div>
      <div className='text-sm text-gray-500'>{`${num} global ratings`}</div>
      <StarPercentageBar
        leftText='5 Star'
        value={
          (props.content.filter((i) => i.score === 5).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='4 Star'
        value={
          (props.content.filter((i) => i.score === 4).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='3 Star'
        value={
          (props.content.filter((i) => i.score === 3).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='2 Star'
        value={
          (props.content.filter((i) => i.score === 2).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='1 Star'
        value={
          (props.content.filter((i) => i.score === 1).length / num) * 100 || 0
        }
      />
      <StarPercentageBar
        leftText='0 Star'
        value={
          (props.content.filter((i) => i.score === 0).length / num) * 100 || 0
        }
      />
    </div>
  );
};

const StarPercentageBar = (props: { leftText?: string; value: number }) => {
  const { leftText, value = 0 } = props;
  const valueRound = Math.round(value);
  return (
    <div className='flex items-center justify-between gap-2'>
      {leftText && (
        <span className='text-sm text-gray-500 w-32'>{leftText}</span>
      )}
      <progress
        className='progress progress-info'
        value={valueRound}
        max='100'
      ></progress>
      <span className='text-sm text-gray-500 w-32'>{`${valueRound}%`}</span>
    </div>
  );
};

const ReviewsTable = (props: {
  content: BookRatingsProps[];
  bookId: string;
}) => {
  const { content, bookId } = props;
  const [targetUserId, setTargetUserId] = React.useState<string | null>(null);

  const deletaDialogRef = React.useRef<HTMLDialogElement>(null);

  const handleDelete = (userId: string) => () => {
    setTargetUserId(userId);
    deletaDialogRef.current?.showModal();
  };

  return (
    <>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {content.map((item) => {
            return (
              <>
                <tr key={item.userId}>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar placeholder'>
                        <div className='bg-neutral-focus text-neutral-content mask mask-squircle w-12 h-12'>
                          <span className='text-3xl'>
                            {item.user.nickname.substring(0, 1)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className='font-bold'>{item.user.nickname}</div>
                        <div className='text-sm opacity-50'>
                          User ID: {item.user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <HalfRating disabled rating={item.score} />
                  </td>
                  <td>{`${new Date(item.ratedAt).toLocaleDateString()}`}</td>
                  <th>
                    <button
                      className='btn btn-error btn-xs'
                      onClick={handleDelete(item.userId)}
                    >
                      delete
                    </button>
                  </th>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {targetUserId && (
        <BookRatingDeleteDialog
          bookId={bookId}
          userId={targetUserId}
          ref={deletaDialogRef}
        />
      )}
    </>
  );
};
