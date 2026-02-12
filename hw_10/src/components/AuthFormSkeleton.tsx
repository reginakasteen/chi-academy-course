import { Box, Skeleton } from "@mui/material";

const AuthFormSkeleton = () => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Skeleton variant="text" height={40} width="40%" sx={{ mx: "auto" }} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={40} />
    </Box>
  );
};

export default AuthFormSkeleton;
