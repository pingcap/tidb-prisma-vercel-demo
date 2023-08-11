import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';

import CommonLayout from 'components/v2/Layout';
import { bookDetailsIdState } from 'atoms';
import BookInfoSection from 'components/v2/BookDetails/BookInfoSection';

const Book: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [, setBookDetailsId] = useRecoilState(bookDetailsIdState);
  // const bookDetailsLodable = useRecoilValueLoadable(bookDetailsQuery);

  React.useEffect(() => {
    id && setBookDetailsId(id as string);
  }, [id, setBookDetailsId]);

  return (
    <>
      <Head>
        <title>Book Details</title>
        <meta name='description' content='Book Details' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <CommonLayout
        headerProps={{
          hideMenu: true,
        }}
      >
        <BookInfoSection />
      </CommonLayout>
    </>
  );
};

export default Book;
