import { Stack, Skeleton, Box, Typography } from '@mui/material';

export default function SkeletonComponent() {
  return (
    <Box sx={{ width: '250px' }}>
      <Stack sx={{ width: '80%' }}>
        <Typography variant="body2">
          <Skeleton variant="text" width="200%" animation="wave" />
        </Typography>
      </Stack>
    </Box>
  );
}
