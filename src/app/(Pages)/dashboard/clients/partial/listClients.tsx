'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Avatar, Collapse } from '@mui/material';
//Internal app
import { useClientStore } from '@/store';
import { SkeletonTable, EmptySlot, ErrorSlot } from '@/components';
import { CashIcons, DeleteIcons } from '%/Icons';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { IClientProps, IListClientsProps } from '@/interfaces';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function ClientList(props: IListClientsProps): JSX.Element {
  const { data, loading, disabledBtnDelete, error } = props;

  const router = useRouter();

  const { setClient } = useClientStore();

  const [showOptions, setShowOptions] = useState(null);
  const [clientsData, setClientsData] = useState<IClientProps[]>(data);

  useEffect(() => {
    setClientsData(data);
  }, [data]);

  const handleOptionsClick = (index: any) => {
    setShowOptions(showOptions === index ? null : index);
  };

  const handleCash = (client: IClientProps) => {
    router.push('/dashboard/collect');
    setClient(client);
    setShowOptions(null);
  };

  const handleDelete = (client: IClientProps) => {
    const newClientsData = clientsData.map((item) => {
      if (item.id === client.id) {
        return {
          ...item,
          status_type: '5',
          status: 'Cancelado',
        };
      }
      return item;
    });
    setClientsData(newClientsData);
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

        borderRadius: '14px',
        '& li:first-of-type': {
          borderRadius: '14px 14px 0 0',
        },
        '& li:last-of-type': {
          borderRadius: '0 0 14px 14px ',
        },
      }}
    >
      {clientsData.map((client: IClientProps, index: number) => (
        <Box
          key={index}
          component="li"
          sx={{
            height: 60,
            display: 'flex',
            bgcolor: slate[100],
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: ` 1px solid ${slate[300]}`,
          }}
        >
          <Box sx={{ display: 'flex', flexShrink: 0, width: 'calc(100% - 40px)' }}>
            <Box sx={{ px: '12px' }}>
              <Avatar
                sx={{
                  bgcolor: fuchsiaBlue[200],
                  color: 'primary.main',
                  fontSize: 12,
                  fontWeight: 700,
                  height: 28,
                  width: 28,
                }}
                {...stringAvatar(client.fullname)}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                minWidth: 170,
                cursor: 'pointer',
              }}
              onClick={() => handleNameClick(index)}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ maxWidth: 140, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                >
                  {client.fullname}
                </Typography>
                <Typography fontSize={10} lineHeight="16px">
                  {dayjs(client.date).format('MMMM D, h:mm a')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="subtitle2" color={client.status === 'PENDING' ? '#EE2737' : slate[700]}>
                  {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(client.amount)}
                </Typography>
                <Typography
                  fontSize={10}
                  lineHeight="16px"
                  color={client.status === 'PENDING' ? '#EE2737' : slate[700]}
                >
                  {client.status}
                </Typography>
              </Box>
            </Box>
          </Box>
          {showOptions !== index && (
            <IconButton onClick={() => handleOptionsClick(index)}>
              <MoreVertOutlinedIcon />
            </IconButton>
          )}
          <Collapse
            orientation={'horizontal'}
            in={showOptions === index}
            timeout={300}
            sx={{ flexShrink: 0 }}
            easing={{ enter: 'out' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', ml: '12px' }}>
              <Box
                sx={{
                  bgcolor: '#D3FCB6',
                  height: 59,
                  width: 59,
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
                <IconButton onClick={() => handleDelete(client)} disabled={client.status_type !== disabledBtnDelete}>
                  <DeleteIcons sx={{ color: client.status_type === disabledBtnDelete ? slate[700] : '' }} />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Box>
      ))}

      {loading && <SkeletonTable />}
      {error}
    </Box>
  );
}
