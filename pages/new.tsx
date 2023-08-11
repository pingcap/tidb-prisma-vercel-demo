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
import { PAGE_SIZE } from 'const';

const MOCK_BOOK_LIST = [
  {
    id: '1',
    title: "You've Lost That Lovin' Feelin'",
    type: 'Sports',
    publishedAt: '2013-01-03T18:12:52.000Z',
    stock: 108,
    price: '100.35',
    authors: [
      {
        author: {
          id: '15',
          name: 'Jennie Schumm',
        },
      },
    ],
  },
  {
    id: '2',
    title: 'Walk On By',
    type: 'Novel',
    publishedAt: '2016-05-29T08:59:21.000Z',
    stock: 0,
    price: '143.33',
    authors: [
      {
        author: {
          id: '1',
          name: 'Juanita Fay',
        },
      },
    ],
  },
  {
    id: '3',
    title: 'Check On It',
    type: 'Life',
    publishedAt: '2012-10-22T08:45:05.000Z',
    stock: 4,
    price: '24.13',
    authors: [
      {
        author: {
          id: '18',
          name: 'Jordan Weber',
        },
      },
    ],
    averageRating: 2.6,
    ratings: 5,
  },
  {
    id: '4',
    title: 'Born to Run',
    type: 'Life',
    publishedAt: '2015-03-22T04:06:45.000Z',
    stock: 7754,
    price: '186.74',
    authors: [
      {
        author: {
          id: '4',
          name: 'Randolph Purdy',
        },
      },
    ],
    averageRating: 2,
    ratings: 1,
  },
  {
    id: '5',
    title: 'I Can Dream',
    type: 'Magazine',
    publishedAt: '2019-05-14T20:40:13.000Z',
    stock: 64,
    price: '46.26',
    authors: [
      {
        author: {
          id: '17',
          name: 'Hector Greenholt',
        },
      },
    ],
    averageRating: 5,
    ratings: 1,
  },
  {
    id: '6',
    title: 'How Will I Know',
    type: 'Education_nbsp__amp__nbsp_Reference',
    publishedAt: '2002-05-22T00:04:57.000Z',
    stock: 219250,
    price: '170.66',
    authors: [
      {
        author: {
          id: '18',
          name: 'Jordan Weber',
        },
      },
    ],
  },
  {
    id: '7',
    title: 'Down Hearted Blues',
    type: 'Humanities_nbsp__amp__nbsp_Social_nbsp_Sciences',
    publishedAt: '2002-11-18T22:30:58.000Z',
    stock: 1386,
    price: '56.08',
    authors: [
      {
        author: {
          id: '4',
          name: 'Randolph Purdy',
        },
      },
    ],
  },
  {
    id: '8',
    title: "If You Don't Know Me By Now",
    type: 'Arts',
    publishedAt: '2011-07-19T01:19:11.000Z',
    stock: 0,
    price: '10.22',
    authors: [
      {
        author: {
          id: '11',
          name: 'Brett Krajcik',
        },
      },
    ],
  },
];

const Home: NextPage = () => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const [homePageBookSum] = useRecoilState(homePageBookSumState);

  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name='description' content='Bookstore Home Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <CommonLayout>
        <BookList page={1} pageSize={PAGE_SIZE} />
      </CommonLayout>
    </>
  );
};

export default Home;
