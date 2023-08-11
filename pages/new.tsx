import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
  SetterOrUpdater,
} from 'recoil';
import { homePageBookSumState, homePageQueryState } from 'atoms';
import { homePageQuery } from 'selectors';
import { XMarkIcon } from '@heroicons/react/24/outline';

import CommonLayout from 'components/v2/Layout';
import { FilteredChips } from 'components/v2/Chips/FilteredChips';
import ShoopingItemCard from 'components/v2/Cards/ShoppingItemCard';
import BookList from 'components/v2/Cards/ShoppingItemCardList';
import Pagination from 'components/v2/Pagination';
import { PAGE_SIZE, BookProps } from 'const';
import {
  fetchBookDetailsById,
  fetchBookRatingsById,
  fetchBooks,
} from 'lib/http';

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const [homePageBookSum] = useRecoilState(homePageBookSumState);

  const handleClickPagination = (page: number) => {
    setCurrentPage(page);
    setHomePageQueryData({ ...homePageQueryData, page });
  };

  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name='description' content='Bookstore Home Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <CommonLayout>
        <BookList page={currentPage} pageSize={PAGE_SIZE} />
        <div className='flex justify-center pt-6'>
          <Pagination
            currentPage={currentPage}
            pages={Math.round(homePageBookSum / PAGE_SIZE)}
            onClick={handleClickPagination}
          />
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
