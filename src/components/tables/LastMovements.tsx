'use client';

import dayjs from 'dayjs';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { NorthEast, SouthEast } from '@mui/icons-material';
//Internal app
import { TableDataProps } from '@/interfaces';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue, slate } from '@/theme/theme-default';

/**
 * Table used to show the last 5 moves
 *
 * @param data - Receive a array
 * @example
 * [{
 *   title: string;
 *   date: string;
 *   amount: number;
 *   incoming: boolean;
 * }]
 */
export default function LastMovements({ data, loading }: TableDataProps): JSX.Element {
  const LoadingSkeleton = [];
  for (var i = 0; i < 5; i++) {
    LoadingSkeleton.push(
      <Box key={i} sx={{ display: 'flex', flexDirection: 'row', marginY: '8px' }}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        mb: 10,
        borderRadius: '24px',
        '& li:first-of-type': {
          borderRadius: '16px 16px 0 0',
        },
        '& li:last-of-type': {
          borderRadius: '0 0 16px 16px ',
        },
      }}
      onScroll={() => {
        console.log('element scrol');
      }}
    >
      {data.map((row, idx) => (
        <Box
          key={idx}
          component="li"
          sx={{
            height: '60px',
            display: 'flex',
            backgroundColor: slate[100],
            alignItems: 'center',
            borderBottom: ` 1px  solid ${slate[300]}`,
            paddingX: '16px',
            gap: '12px',
          }}
        >
          <Box>
            <Avatar
              sx={{
                bgcolor: fuchsiaBlue[200],
                color: 'primary.main',
                fontSize: 12,
                fontWeight: 700,
                height: 28,
                width: 28,
              }}
              {...stringAvatar(row.title)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ maxWidth: '140px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {row.title}
              </Typography>
              <Typography sx={{ fontSize: '10px', lineHeight: '16px' }}>
                {dayjs(row.date).format('MMMM D, h:mm a')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Typography variant="subtitle2" color={row.incoming ? slate[700] : '#EE2737'}>
                S/ {row.amount}
              </Typography>
              <Avatar sx={{ bgcolor: row.incoming ? '#C8EDC5' : '#FFC8C8', height: '16px', width: '16px' }}>
                {row.incoming ? (
                  <NorthEast sx={{ height: '12px', width: '12px', color: '#307E0D' }} />
                ) : (
                  <SouthEast sx={{ height: '12px', width: '12px', color: '#FF230D' }} />
                )}
              </Avatar>
            </Box>
          </Box>
        </Box>
      ))}
      {loading && LoadingSkeleton}
    </Box>
  );
}
