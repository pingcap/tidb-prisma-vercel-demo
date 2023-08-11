import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { homePageBookSumState, homePageQueryState } from 'atoms';

import CommonLayout from 'components/v2/Layout';
import { FilteredChips } from 'components/v2/Chips/FilteredChips';
import BookList from 'components/v2/Cards/ShoppingItemCardList';
import Pagination from 'components/v2/Pagination';
import { PAGE_SIZE } from 'const';

const Home: NextPage = () => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const [homePageBookSum] = useRecoilState(homePageBookSumState);

  const handleClickPagination = (page: number) => {
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
        {(homePageQueryData.sort || homePageQueryData.type) && (
          <FilteredChips
            data={homePageQueryData}
            onChange={setHomePageQueryData}
          />
        )}
        <BookList page={homePageQueryData?.page || 1} pageSize={PAGE_SIZE} />
        <div className='flex justify-center pt-6'>
          <Pagination
            currentPage={homePageQueryData?.page || 1}
            pages={Math.round(homePageBookSum / PAGE_SIZE)}
            onClick={handleClickPagination}
          />
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
