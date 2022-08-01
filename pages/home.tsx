import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

import styles from "../styles/HomePage.module.css";
import CommonLayout from "components/Layout";
import LeftNav from "components/Navigation/HomeLeftNav";
import BookInfoCard from "components/Card/BookInfo";
import { BookSekeleton } from "components/Skeleton/BookCardSkeleton";

const MOCK_books = Array.from(Array(8)).map((_, idx) => ({
  id: idx,
  title: `Book Title ${idx}`,
  type: "mock",
  price: 20.4,
  avgRatings: 3.1,
}));

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bookstore Home</title>
        <meta name="description" content="Bookstore Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <div className={styles.content}>
          <LeftNav className={styles.nav} />
          <main className={styles.main}>
            <Container>
              <div className={styles.bookList}>
                {MOCK_books.map((book) => (
                  <BookInfoCard key={book.id} {...book} />
                ))}
              </div>
            </Container>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
