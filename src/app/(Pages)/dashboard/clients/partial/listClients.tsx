'use client';

import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import { Box, Skeleton, Typography, Avatar } from '@mui/material';
//Internal app
import { useClientStore } from '@/store';
import { CashIcons, DeleteIcons } from '%/Icons';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { IClientProps, IListClientsProps } from '@/interfaces';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function ClientList(props: IListClientsProps): JSX.Element {
  const { data, loading } = props;

  const LoadingSkeleton = [];
  for (var i = 0; i < 5; i++) {
    LoadingSkeleton.push(
      <Box key={i} sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </Box>
      </Box>
    );
  }

  const router = useRouter();

  const { setClient } = useClientStore();

  const [showOptions, setShowOptions] = useState(null);

  const handleOptionsClick = (index: any) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleCash = (client: IClientProps) => {
    router.push('/dashboard/collect');
    setClient(client);
    setShowOptions(null);
  };

  const handleDelete = (index: number) => {
    data.splice(index, 1);
    setShowOptions(null);
  };

  const handleNameClick = (index: number) => {
    setShowOptions(null);
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',

        borderRadius: '24px',
        '& li:first-of-type': {
          borderRadius: '16px 16px 0 0',
        },
        '& li:last-of-type': {
          borderRadius: '0 0 16px 16px ',
        },
      }}
    >
      {data.map((client: IClientProps, index: number) => (
        <Box
          key={index}
          component="li"
          sx={{
            height: '60px',
            display: 'flex',
            bgcolor: slate[100],
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: ` 1px solid ${slate[300]}`,
            pl: '10px',
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
              {...stringAvatar(client.name)}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              minWidth: '200px',
              cursor: 'pointer',
            }}
            onClick={() => handleNameClick(index)}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ maxWidth: 140, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {client.name}
              </Typography>
              <Typography fontSize={10} lineHeight="16px">
                {dayjs(client.date).format('MMMM D, h:mm a')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="subtitle2" color={client.status === 'Vencido' ? '#EE2737' : slate[700]}>
                S/ {client.amount}
              </Typography>
              <Typography fontSize={10} lineHeight="16px" color={client.status === 'Vencido' ? '#EE2737' : slate[700]}>
                {client.status}
              </Typography>
            </Box>
          </Box>
          {showOptions !== index ? (
            <IconButton onClick={() => handleOptionsClick(index)}>
              <MoreVertOutlinedIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#D3FCB6' }}>
              <Box
                sx={{
                  bgcolor: '#D3FCB6',
                  height: '59px',
                  width: '59px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton onClick={() => handleCash(client)}>
                  <CashIcons sx={{ color: slate[700] }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  bgcolor: '#FBE5E5',
                  height: 59,
                  width: 59,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcons sx={{ color: slate[700] }} />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      ))}
      {loading && LoadingSkeleton}
    </Box>
  );
}
