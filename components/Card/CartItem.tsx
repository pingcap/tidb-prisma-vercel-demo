import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Rating } from "@mui/material";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import { shoppingCartState } from "atoms";

import { shoppingCartItemProps } from "const";
import { currencyFormat } from "lib/utils";

export default function CartItemCard(props: shoppingCartItemProps) {
  const { id, title, authors, type, price, averageRating, quantity, stock } =
    props;

  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  function handleAddQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) {
          prev.push({
            ...item,
            quantity: quantity + 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function handleRemoveQty() {
    setShoppingCart((oldShoppingCart) => {
      return oldShoppingCart.reduce<shoppingCartItemProps[]>((prev, item) => {
        if (item.id === id) {
          prev.push({
            ...item,
            quantity: quantity - 1,
          });
        } else {
          prev.push(item);
        }
        return prev;
      }, []);
    });
  }

  function deleteItem() {
    setShoppingCart((oldShoppingCart) => {
      return [...oldShoppingCart.filter((i) => i.id !== id)];
    });
  }

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow:
          "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
        border: "1px solid #e9eaee",
      }}
    >
      <CardMedia
        component="img"
        // height="140"
        sx={{ width: 150 }}
        image={`https://picsum.photos/seed/${id}/200/300`}
        alt={title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          {type && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {type}
            </Typography>
          )}
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {authors.map((author) => author.author.name).join(`, `)}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Stock: ${stock}`}
          </Typography>
        </CardContent>
        <CardContent
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <ButtonGroup
            disableElevation
            variant="contained"
            size="small"
            sx={{ alignItems: "center", gap: "0.5rem" }}
          >
            <IconButton
              aria-label="Add"
              size="small"
              onClick={handleAddQty}
              disabled={quantity >= stock}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
            <Typography component="div" variant="body2">
              {quantity}
            </Typography>
            <IconButton
              aria-label="Remove"
              size="small"
              onClick={handleRemoveQty}
              disabled={quantity <= 1}
            >
              <RemoveIcon fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
          <Button size="small" color="error" onClick={deleteItem}>
            Delete
          </Button>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          marginLeft: "auto",
        }}
      >
        <Typography variant="h5">
          <Typography
            component="span"
            variant="body2"
            sx={{ paddingRight: 0.5 }}
          >
            $
          </Typography>
          {currencyFormat(price)}
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            sx={{ paddingLeft: 0.5 }}
          >
            per one
          </Typography>
        </Typography>
      </Box>
    </Card>
  );
}
