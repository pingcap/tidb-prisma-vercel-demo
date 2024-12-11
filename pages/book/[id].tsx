import * as React from 'react';

import BookReviewsSection from 'components/v2/BookDetails/BookReviewsSection';
import CommonLayout from 'components/v2/Layout';
import Head from 'next/head';
import type { NextPage } from 'next';
import { bookDetailsIdState } from 'atoms';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const BookInfoSection = dynamic(import('components/v2/BookDetails/BookInfoSection'), { ssr: false })

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
        <BookReviewsSection />
      </CommonLayout>
    </>
  );
};

export default Book;
