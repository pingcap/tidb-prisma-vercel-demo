import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

import { Typography } from "@mui/material";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import {} from "atoms";
import {} from "selectors";

import styles from "../styles/HomePage.module.css";
import CommonLayout from "components/Layout";
import LeftNav from "components/Navigation/HomeLeftNav";
import BookInfoCard from "components/Card/BookInfo";
import CartList from "components/List/CartList";

const CartPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="shopping cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommonLayout>
        <Container>
          <Typography component="h1" variant="h4" sx={{ pt: "1rem" }}>
            Shopping Cart
          </Typography>
          <CartList />
        </Container>
      </CommonLayout>
    </>
  );
};

export default CartPage;
