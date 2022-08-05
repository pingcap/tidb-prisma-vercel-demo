import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import CommonHeader from "components/Layout/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid(props: { children?: any }) {
  return (
    <>
      <CommonHeader />
      <Paper
        sx={{
          borderRadius: "unset",
          boxShadow: "none",
          backgroundColor: "#fafafa",
          minHeight: "calc(100vh - 4rem)",
        }}
      >
        {props?.children}
      </Paper>
    </>
  );
}
