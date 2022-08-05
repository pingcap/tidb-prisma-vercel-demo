import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
  SetterOrUpdater,
} from "recoil";
import { homePageBookSumState, homePageQueryState } from "atoms";
import { homePageQuery } from "selectors";

import styles from "../styles/HomePage.module.css";
import CommonLayout from "components/Layout";
import LeftNav from "components/Navigation/HomeLeftNav";
import BookInfoCard from "components/Card/BookInfo";
import { BookSekeleton } from "components/Skeleton/BookCardSkeleton";

const PAGE_SIZE = 8;

const BookList = (props: { page: number }) => {
  const { page } = props;
  // const bookListLoadable = useRecoilValueLoadable(currentPageIdxQuery);
  const bookListLoadable = useRecoilValueLoadable(homePageQuery);
  const [homePageBookSum, setHomePageBookSum] =
    useRecoilState(homePageBookSumState);
  switch (bookListLoadable.state) {
    case "hasValue":
      setHomePageBookSum(bookListLoadable.contents.total);
      return (
        <>
          {!!homePageBookSum && (
            <Typography
              component="div"
              variant="body2"
              sx={{ padding: "1rem 0" }}
            >{`${PAGE_SIZE * (page - 1) + 1} ~ ${
              PAGE_SIZE * page
            } of over ${homePageBookSum} results`}</Typography>
          )}
          <div className={styles.bookList}>
            {bookListLoadable.contents.content.map((book) => (
              <BookInfoCard key={book.id} {...book} />
            ))}
          </div>
        </>
      );
    case "loading":
      return (
        <>
          <Skeleton sx={{ maxWidth: "10rem", margin: "1rem 0" }} />
          <div className={styles.bookList}>
            {Array.from(Array(PAGE_SIZE)).map((i, idx) => (
              <BookSekeleton key={idx} />
            ))}
          </div>
        </>
      );
    case "hasError":
      throw bookListLoadable.contents;
  }
};

const FilterChips = (props: {
  data: { page: number; type: string; sort: string; size: number };
  onChange: SetterOrUpdater<{
    page: number;
    type: string;
    sort: string;
    size: number;
  }>;
}) => {
  const { data, onChange } = props;
  const handleDelete = (key: "type" | "sort") => {
    onChange((originData) => ({ ...originData, [key]: "" }));
  };
  return (
    <Stack direction="row" spacing={1}>
      {data.type && (
        <Chip
          label={`Type: ${data.type
            .replaceAll(`_nbsp_`, ` `)
            .replaceAll(`_amp_`, `&`)}`}
          size="small"
          onDelete={() => {
            handleDelete("type");
          }}
        />
      )}
      {data.sort && (
        <Chip
          label={`Sort: ${data.sort}`}
          size="small"
          onDelete={() => {
            handleDelete("sort");
          }}
        />
      )}
    </Stack>
  );
};

const Home: NextPage = () => {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);
  const [homePageBookSum] = useRecoilState(homePageBookSumState);

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
              {(homePageQueryData.sort || homePageQueryData.type) && (
                <FilterChips
                  data={homePageQueryData}
                  onChange={setHomePageQueryData}
                />
              )}
              <BookList page={homePageQueryData.page} />
              <Box
                sx={{
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={Math.ceil(homePageBookSum / PAGE_SIZE)}
                  page={homePageQueryData.page}
                  color="primary"
                  onChange={(
                    event: React.ChangeEvent<unknown>,
                    page: number
                  ) => {
                    // setHomePageIdx(page);
                    setHomePageQueryData({ ...homePageQueryData, page });
                  }}
                />
              </Box>
            </Container>
          </main>
        </div>
      </CommonLayout>
    </>
  );
};

export default Home;
