import React from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Reusable component that displays a loading skeleton with 5 elements.
 * Useful for indicating that data is being loaded or for enhancing the user experience during loading.
 */
export default function SkeletonTable(): JSX.Element {
  const skeletons = [];
  for (let i = 0; i < 5; i++) {
    skeletons.push(
      <Box key={i} sx={{ display: 'flex', flexDirection: 'row', marginY: '8px' }}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Box>
      </Box>
    );
  }

  return <>{skeletons}</>;
};
