import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const BookSekeleton = () => {
  return (
    <>
      <Box>
        <Skeleton variant="rectangular" height={128} />
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </>
  );
};
