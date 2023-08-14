import * as React from 'react';

import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { homePageBookSumState } from 'atoms';
import { homePageQuery } from 'selectors';
import ShoopingItemCard from 'components/v2/Cards/ShoppingItemCard';

export interface BookListProps {
  page: number;
  pageSize: number;
}

export default function BookList(props: BookListProps) {
  const { page, pageSize } = props;
  // const bookListLoadable = useRecoilValueLoadable(currentPageIdxQuery);
  const bookListLoadable = useRecoilValueLoadable(homePageQuery);
  const [homePageBookSum, setHomePageBookSum] =
    useRecoilState(homePageBookSumState);
  switch (bookListLoadable.state) {
    case 'hasValue':
      setHomePageBookSum(bookListLoadable.contents.total);
      return (
        <>
          {!!homePageBookSum && (
            <div className='text-sm text-gray-500 pb-4'>{`${
              pageSize * (page - 1) + 1
            } ~ ${
              pageSize * page > homePageBookSum
                ? homePageBookSum
                : pageSize * page
            } of over ${homePageBookSum} results`}</div>
          )}
          <div className='grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8'>
            {bookListLoadable.contents.content.map((book) => (
              <ShoopingItemCard key={book.id} {...book} />
            ))}
          </div>
        </>
      );
    case 'loading':
      return (
        <div className='flex items-center justify-center'>
          <span className='loading loading-bars loading-lg'></span>
        </div>
      );
    case 'hasError':
      throw bookListLoadable.contents;
  }
}
