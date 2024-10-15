'use client';

import dayjs from 'dayjs';
import { Avatar, Box, Typography } from '@mui/material';
import { NorthEast, SouthEast } from '@mui/icons-material';
//Internal app
import { TableDataProps } from '@/interfaces';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { SkeletonTable, EmptySlot, ErrorSlot } from '@/components';

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

export default function LastMovements({ data, loading, error, emptySlot }: TableDataProps): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',

        borderRadius: '14px',
        '& li:first-of-type': {
          borderRadius: '14px 14px 0 0',
        },
        '& li:last-of-type': {
          borderRadius: '0 0 14px 14px ',
        },
      }}
    >
      {error && <ErrorSlot />}
      {data.length > 0
        ? data.map((row, idx) => <RowDetail key={idx} row={row} />)
        : !loading && !error && (emptySlot ?? <EmptySlot />)}
      {loading && <SkeletonTable />}
    </Box>
  );
}

const RowDetail = ({ row }: { row: TableDataProps['data'][number] }) => (
  <Box
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
        {...stringAvatar(row.description ? row.description : 'T')}
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
          noWrap
          sx={{
            maxWidth: 140,
            textTransform: 'capitalize',
          }}
        >
          {row.description.toLowerCase() ?? '-'}
        </Typography>
        <Typography
          sx={{
            fontSize: 10,
            lineHeight: '16px',
            textTransform: 'lowercase',
            '&::first-letter': { textTransform: 'uppercase' },
          }}
        >
          {dayjs(row.date).format('MMMM D, h:mm a')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 / 2 }}>
        <Typography variant="subtitle2" color={row.transactionType === 'C' ? slate[700] : '#EE2737'}>
          {Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
          }).format(row.amount)}
        </Typography>
        <Avatar
          sx={{
            bgcolor: row.transactionType === 'C' ? '#C8EDC5' : '#FFC8C8',
            height: 16,
            width: 16,
          }}
        >
          {row.transactionType === 'C' ? (
            <NorthEast sx={{ height: 12, width: 12, color: '#307E0D' }} />
          ) : (
            <SouthEast sx={{ height: 12, width: 12, color: '#FF230D' }} />
          )}
        </Avatar>
      </Box>
    </Box>
  </Box>
);
