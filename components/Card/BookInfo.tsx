import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface BookInfoCardProps {
  id: number;
  title: string;
  type?: string;
  price: number;
  avgRatings: number;
}

function currencyFormat(num: number) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function BasicCard(props: BookInfoCardProps) {
  const { id, title, type, price, avgRatings } = props;
  return (
    <Card sx={{ width: 256 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://picsum.photos/seed/${id}/200/300`}
        alt={title}
      />
      <CardContent>
        {type && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
        )}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          author 1
        </Typography>
        <Rating
          name="read-only"
          precision={0.5}
          value={3.5}
          size="small"
          readOnly
        />
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to cart">
          <AddShoppingCartIcon />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ marginLeft: "auto", marginRight: "8px" }}
        >
          <Typography
            component="span"
            variant="body2"
            sx={{ paddingRight: 0.5 }}
          >
            $
          </Typography>
          {currencyFormat(price)}
        </Typography>
      </CardActions>
    </Card>
  );
}
