import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import { HomeIcon, BookmarkIcon } from '@heroicons/react/24/outline';

import { bookInfoQuery, bookRatingQuery } from 'selectors';
import { BookDetailProps, BookRatingsProps, starLabels } from 'const';
import { currencyFormat, roundHalf } from 'lib/utils';
import BookInfoDialog from 'components/v2/BookDetails/BookInfoDialog';

export default function BookInfoSection() {
  const [bookDetailsState, setBookDetailsState] = React.useState<
    BookDetailProps | undefined
  >();
  const editBookDetailDialogRef = React.useRef<HTMLDialogElement>(null);

  const bookDetailsLodable = useRecoilValueLoadable(bookInfoQuery);

  const handleUpdate = (data: BookDetailProps) => {
    setBookDetailsState(data);
  };

  switch (bookDetailsLodable.state) {
    case 'hasValue':
      const data = bookDetailsLodable.contents.content;
      return (
        <>
          <div className='text-sm breadcrumbs'>
            <ul>
              <li>
                <NextLink href='/'>
                  <HomeIcon className='w-4 h-4' />
                  Book
                </NextLink>
              </li>
              <li>
                <BookmarkIcon className='w-4 h-4' />
                {data.title}
              </li>
            </ul>
          </div>

          <div className='hero h-auto justify-start shadow-xl rounded-box'>
            <div className='hero-content flex-col lg:flex-row'>
              <Image
                src={`https://picsum.photos/seed/${data.id}/200/280`}
                alt={`book image`}
                width={200}
                height={280}
              />
              <div className='flex flex-col gap-2'>
                <h1 className='text-5xl font-bold'>{data.title}</h1>
                <p className='pt-6'>
                  <span className='text-lg font-bold pr-4'>Type:</span>
                  {data.type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
                </p>
                <p>
                  <span className='text-lg font-bold pr-4'>
                    Publication date:
                  </span>
                  {new Date(data.publishedAt).toLocaleDateString()}
                </p>
                <p>
                  <span className='text-lg font-bold pr-4'>Price:</span>
                  {`$ ${currencyFormat(data.price)}`}
                </p>
                <p>
                  <span className='text-lg font-bold pr-4'>In stock:</span>
                  {bookDetailsState?.stock || data.stock}
                </p>
                <button
                  className='btn btn-info w-32'
                  onClick={() => {
                    editBookDetailDialogRef.current?.showModal();
                  }}
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          {data && (
            <BookInfoDialog
              key={`${data.id}-${data.stock}`}
              id='edit_book_detail'
              ref={editBookDetailDialogRef}
              data={data}
              onSuccess={handleUpdate}
            />
          )}
        </>
      );
    case 'loading':
      return (
        <>
          <div className='flex items-center justify-center'>
            <span className='loading loading-bars loading-lg'></span>
          </div>
        </>
      );
    case 'hasError':
      throw bookDetailsLodable.contents;
  }
}
