import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const BookSekeleton = () => {
  return (
    <>
      <Card
        sx={{
          width: 256,
          boxShadow:
            "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
          border: "1px solid #e9eaee",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CardMedia>
            <Skeleton variant="rectangular" height={140} />
          </CardMedia>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <Skeleton />
            </Typography>
            <Typography variant="h5" component="div" sx={{ cursor: "pointer" }}>
              <Skeleton />
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Skeleton />
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Typography variant="h5" component="div" sx={{ width: "100%" }}>
            <Skeleton sx={{ width: "100%" }} />
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};
