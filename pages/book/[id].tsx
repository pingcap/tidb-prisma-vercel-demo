import { BookDetailProps, BookRatingsProps, starLabels } from "const";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { bookInfoQuery, bookRatingQuery } from "selectors";
import { currencyFormat, roundHalf } from "lib/utils";
import { useEffect, useState } from "react";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";

import AddRatingDialog from "components/Dialog/AddRatingDialog";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import BookInfoFormDialog from "components/Dialog/BookInfoDialog";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import CommonLayout from "components/Layout";
import Container from "@mui/material/Container";
import DeleteRatingDialog from "components/Dialog/DeleteRatingDialog";
import { Divider } from "@mui/material";
import Head from "next/head";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import { bookDetailsIdState } from "atoms";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const BookInfoSection = () => {
  const [bookDetailsState, setBookDetailsState] = useState<
    BookDetailProps | undefined
  >();

  const bookDetailsLodable = useRecoilValueLoadable(bookInfoQuery);

  const handleUpdate = (data: BookDetailProps) => {
    setBookDetailsState(data);
  };

  switch (bookDetailsLodable.state) {
    case "hasValue":
      const data = bookDetailsLodable.contents.content;
      return (
        <>
          <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
            <Link href="/">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Book
              </Typography>
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <BookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              {data.title}
            </Typography>
          </Breadcrumbs>
          <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Paper elevation={24} sx={{ width: "200px", height: "300px" }}>
              <Image
                src={`https://picsum.photos/seed/${data.id}/200/300`}
                alt={`book image`}
                width={200}
                height={300}
              />
            </Paper>
            <Stack spacing={2}>
              <Typography variant="h5">
                Book Details
                {/* <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton> */}
                <BookInfoFormDialog data={data} onSuccess={handleUpdate} />
              </Typography>
              <Typography>
                {`Type: `}
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  component="span"
                >
                  {data.type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
                </Typography>
              </Typography>
              <Typography>
                {`Title: `}
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  component="span"
                >
                  {data.title}
                </Typography>
              </Typography>
              <Typography>
                {`Publication date: `}
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  component="span"
                >
                  {new Date(data.publishedAt).toLocaleDateString()}
                </Typography>
              </Typography>
              <Typography>
                {`In stock: `}
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  component="span"
                >
                  {bookDetailsState?.stock || data.stock}
                </Typography>
              </Typography>
              <Typography>
                {`Price: `}
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  component="span"
                >
                  {`$ ${currencyFormat(data.price)}`}
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </>
      );
    case "loading":
      return (
        <>
          <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0" }}>
            <Link href="/">
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Book
              </Typography>
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <Skeleton sx={{ minWidth: "5rem" }} />
            </Typography>
          </Breadcrumbs>

          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Paper elevation={24} sx={{ width: "200px", height: "300px" }}>
              <Skeleton sx={{ height: "300px", transform: "none" }} />
            </Paper>

            <Stack>
              <Typography
                component="div"
                variant="h5"
                sx={{ minWidth: "10rem" }}
              >
                <Skeleton />
              </Typography>
              <Typography component="div" sx={{ minWidth: "5rem" }}>
                <Skeleton />
              </Typography>
              <Typography component="div" sx={{ minWidth: "5rem" }}>
                <Skeleton />
              </Typography>
            </Stack>
          </Box>
        </>
      );
    case "hasError":
      throw bookDetailsLodable.contents;
  }
};

const ReviewItem = (props: BookRatingsProps) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1rem 0",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Avatar sx={{ width: 24, height: 24 }}>
            {props.user.nickname.substring(0, 1)}
          </Avatar>
          <Typography color="text.secondary">{props.user.nickname}</Typography>
          <DeleteRatingDialog
            bookId={props.bookId}
            userId={props.userId}
            score={props.score}
            ratedAt={props.ratedAt}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Rating
            value={props.score}
            // defaultValue={props.score}
            size="small"
            precision={0.5}
            readOnly
          />
          <Typography color="text.secondary" variant="body2">
            {props.score}
          </Typography>
        </Box>
        <Typography color="text.secondary" variant="body2">
          {`Reviewed on ${new Date(props.ratedAt).toLocaleDateString()}`}
        </Typography>
      </Box>
    </>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const StarPercentageBar = (props: { leftText?: string; value: number }) => {
  const { leftText, value } = props;
  const valueRound = Math.round(value);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5rem",
      }}
    >
      {leftText && (
        <Typography color="text.secondary" variant="body2" component="span">
          {leftText}
        </Typography>
      )}
      <BorderLinearProgress
        variant="determinate"
        value={valueRound}
        sx={{ flexGrow: 1 }}
      />
      {
        <Typography
          color="text.secondary"
          variant="body2"
          component="span"
          sx={{ width: "2rem" }}
        >{`${valueRound}%`}</Typography>
      }
    </Box>
  );
};

const ReviewOverview = (props: { content: BookRatingsProps[] }) => {
  const num = props.content.length;
  const sum = props.content.reduce((prev, item) => {
    return prev + item.score;
  }, 0);
  const avg = sum / num;
  return (
    <Box
      sx={{
        padding: "1rem 0",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          value={avg}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>{starLabels[roundHalf(avg)]}</Box>
      </Box>
      <Typography
        color="text.secondary"
        variant="body2"
      >{`${num} global ratings`}</Typography>
      <StarPercentageBar
        leftText="5 Star"
        value={(props.content.filter((i) => i.score === 5).length / num) * 100}
      />
      <StarPercentageBar
        leftText="4 Star"
        value={(props.content.filter((i) => i.score === 4).length / num) * 100}
      />
      <StarPercentageBar
        leftText="3 Star"
        value={(props.content.filter((i) => i.score === 3).length / num) * 100}
      />
      <StarPercentageBar
        leftText="2 Star"
        value={(props.content.filter((i) => i.score === 2).length / num) * 100}
      />
      <StarPercentageBar
        leftText="1 Star"
        value={(props.content.filter((i) => i.score === 1).length / num) * 100}
      />
      <StarPercentageBar
        leftText="0 Star"
        value={(props.content.filter((i) => i.score === 0).length / num) * 100}
      />
    </Box>
  );
};

const CustomerReviewSection = () => {
  const bookRatingLoadable = useRecoilValueLoadable(bookRatingQuery);
  const [bookDetailsId] = useRecoilState(bookDetailsIdState);
  switch (bookRatingLoadable.state) {
    case "hasValue":
      const data = bookRatingLoadable.contents.content;
      return (
        <>
          <Typography component="h2" variant="h5">
            Customer Reviews
            {bookDetailsId && <AddRatingDialog bookId={bookDetailsId} />}
          </Typography>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <ReviewOverview content={data.content} />
            <Stack sx={{ width: "100%" }}>
              {data.content.map((item) => (
                <ReviewItem key={item.userId} {...item} />
              ))}
            </Stack>
          </Box>
        </>
      );
    case "loading":
      return <></>;
    case "hasError":
      // throw bookRatingLodable.contents;
      return <></>;
  }
};

const BookDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [, setBookDetailsId] = useRecoilState(bookDetailsIdState);
  // const bookDetailsLodable = useRecoilValueLoadable(bookDetailsQuery);

  useEffect(() => {
    id && setBookDetailsId(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Head>
        <title>Book Details</title>
        <meta name="description" content="Book Details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <Container>
          <BookInfoSection />
          <Divider sx={{ margin: "2rem 0" }} />
          <CustomerReviewSection />
        </Container>
      </CommonLayout>
    </>
  );
};

export default BookDetails;
