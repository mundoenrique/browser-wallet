'use client';

import { useState } from 'react';
import { Box, Grow, Typography } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowForwardIos';
//Internal app
import { AccordionsProps } from '@/interfaces';

/**
 * Drop down card used to display extensive information.
 *
 * @param collapsed - Whether or not to show the content of the accordion.
 * @param title - Text that goes on the card.
 * @param content - Content to display.
 */
export default function Accordions(props: Readonly<AccordionsProps>): JSX.Element {
  const { collapsed, title, content } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean | undefined>(collapsed);

  return (
    <>
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 1,
          cursor: 'pointer',
          display: 'flex',
          height: 40,
          justifyContent: 'space-between',
          p: 1,
          width: '100%',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Typography variant="subtitle2" noWrap width={260}>
          {title}
        </Typography>
        <Arrow sx={{ transform: isCollapsed ? 'rotate(90deg)' : '' }} />
      </Box>

      <Grow in={isCollapsed}>
        <Box sx={{ my: 3, display: isCollapsed ? 'block' : 'none' }}>
          <Typography variant="subtitle1" mb={1}>
            {title}
          </Typography>
          <Typography variant="body2">{content}</Typography>
        </Box>
      </Grow>
    </>
  );
}
