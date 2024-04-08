'use client';

import dayjs from 'dayjs';
import { Avatar, Box, Typography } from '@mui/material';
import { NorthEast, SouthEast } from '@mui/icons-material';
//Internal app
import { SkeletonTable } from '@/components';
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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        mb: 10,
        borderRadius: '14px',
        '& li:first-of-type': {
          borderRadius: '14px 14px 0 0',
        },
        '& li:last-of-type': {
          borderRadius: '0 0 14px 14px ',
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
            height: 60,
            display: 'flex',
            backgroundColor: slate[100],
            alignItems: 'center',
            borderBottom: ` 1px solid ${slate[300]}`,
            px: 2,
            gap: 3 / 2,
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
              <Typography variant="subtitle2" noWrap sx={{ maxWidth: 140 }}>
                {row.title}
              </Typography>
              <Typography sx={{ fontSize: 10, lineHeight: '16px' }}>
                {dayjs(row.date).format('MMMM D, h:mm a')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 / 2 }}>
              <Typography variant="subtitle2" color={row.incoming ? slate[700] : '#EE2737'}>
                S/ {row.amount}
              </Typography>
              <Avatar sx={{ bgcolor: row.incoming ? '#C8EDC5' : '#FFC8C8', height: 16, width: 16 }}>
                {row.incoming ? (
                  <NorthEast sx={{ height: 12, width: 12, color: '#307E0D' }} />
                ) : (
                  <SouthEast sx={{ height: 12, width: 12, color: '#FF230D' }} />
                )}
              </Avatar>
            </Box>
          </Box>
        </Box>
      ))}
      {loading && <SkeletonTable />}
    </Box>
  );
}
