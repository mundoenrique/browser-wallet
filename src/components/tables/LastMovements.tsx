'use client';

import dayjs from 'dayjs';
import { Alert, AlertTitle, Avatar, Box, Typography } from '@mui/material';
import { NorthEast, SouthEast } from '@mui/icons-material';
//Internal app
import { SkeletonTable, EmptySlot } from '@/components';
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

export default function LastMovements({ data, loading, error, handleRetry }: TableDataProps): JSX.Element {
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
    >
      {error && <ErrorSlot handleRetry={handleRetry} />}
      {data.length > 0
        ? data.map((row, idx) => <RowDetail key={idx} row={row} />)
        : !loading && !error && <EmptySlot />}
      {loading && <SkeletonTable />}
    </Box>
  );
}

const ErrorSlot = ({ handleRetry }: any) => {
  return (
    <Alert sx={{ bgcolor: '#FBE5E5', border: `1px solid #ef5350`, minWidth: 250, margin: '4px' }} severity="error">
      <AlertTitle sx={{ fontWeight: 700 }}>¡Oops!</AlertTitle>
      Error al cargar movimientos.
      <Typography
        variant="subtitle2"
        color="initial"
        onClick={() => {
          handleRetry && handleRetry();
        }}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        Intenta de nuevo
      </Typography>
    </Alert>
  );
};

const RowDetail = ({ row }: any) => (
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
        <Typography sx={{ fontSize: 10, lineHeight: '16px' }}>{dayjs(row.date).format('MMMM D, h:mm a')}</Typography>
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
);
