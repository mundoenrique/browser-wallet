'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Typography, Avatar, Collapse, Button } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
//Internal app
import { api } from '@/utils/api';
import { ModalResponsive, SkeletonTable } from '@/components';
import { CashIcons, DeleteIcons } from '%/Icons';
import { stringAvatar } from '@/utils/toolHelper';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { IClientProps, IListClientsProps } from '@/interfaces';
import { useClientStore, useUserStore, useUiStore, useHeadersStore } from '@/store';

export default function ClientList(props: IListClientsProps): JSX.Element {
  const { data, loading, disabledBtnDelete, error, isClients } = props;

  const router = useRouter();

  const { setClient } = useClientStore();

  const host = useHeadersStore((state) => state.host);

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const [showOptions, setShowOptions] = useState(null);

  const [clientsData, setClientsData] = useState<IClientProps[]>(data);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const statusObject: { [key: string]: { text: string; color: string } } = {
    PENDING: {
      text: 'Pendiente',
      color: '',
    },
    CANCELLED: {
      text: 'Cancelado',
      color: '#EE2737',
    },
    PAID: {
      text: 'Cobrado',
      color: '',
    },
    EXPIRED: { text: 'Vencido', color: '#EE2737' },
  };

  useEffect(() => {
    setClientsData(data);
  }, [data]);

  const handleOptionsClick = (index: any) => {
    setShowOptions(showOptions === index ? null : index);
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: misClientes',
        previous_section: 'Yiro :: misClientes',
        selected_content: 'Opción',
        destination_page: `${host}/dashboard/clients`,
      },
    });
  };

  const handleCash = (client: IClientProps) => {
    router.push('/dashboard/collect');
    setClient({ fullname: client.fullname, number: client.number });
    setShowOptions(null);
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: misClientes',
        previous_section: 'dashboard',
        selected_content: 'reenviar_solicitud',
        destination_page: `${host}/dashboard/collect`,
      },
    });
  };

  const handleDelete = async (client: IClientProps) => {
    setLoadingScreen(true);
    api
      .delete(`/payments/${userId}/charges/${client.chargeId}`)
      .then(() => {
        const index = clientsData.findIndex((el) => el.chargeId === client.chargeId);

        const modifiedList =
          index !== -1
            ? [
                ...clientsData.slice(0, index),
                { ...clientsData[index], status: 'CANCELLED' },
                ...clientsData.slice(index + 1),
              ]
            : clientsData;

        setClientsData(modifiedList);
      })
      .catch((e) => {
        setModalError(e);
      })
      .finally(() => {
        setLoadingScreen(false);
        setOpenDeleteModal(false);
        setShowOptions(null);
      });

    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: 'Yiro :: misClientes',
        previous_section: 'dashboard',
        selected_content: 'borrar_solicitud',
        destination_page: `${host}/dashboard/clients`,
      },
    });
  };

  const handleNameClick = (index: number) => {
    setShowOptions(null);
  };

  return (
    <>
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
        {data.length > 0 &&
          clientsData.map((client: IClientProps, index: number) => (
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
                    {...stringAvatar(client.fullname ?? '')}
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
                    <Typography variant="subtitle2" color={statusObject[client.status]?.color}>
                      {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(client.amount)}
                    </Typography>
                    <Typography fontSize={10} lineHeight="16px" color={statusObject[client.status]?.color}>
                      {statusObject[client.status]?.text}
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
                      display: client.status === 'PENDING' ? 'flex' : 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton onClick={() => setOpenDeleteModal(true)} disabled={client.status !== disabledBtnDelete}>
                      <DeleteIcons sx={{ color: client.status === disabledBtnDelete ? slate[700] : '' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}
        {isClients && !loading && <EmptySlot />}
        {data.length == 0 && loading && <SkeletonTable />}
        {error && <ErrorSlot />}
      </Box>
      <ModalResponsive
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
      >
        <Typography variant="subtitle1" mb={3}>
          📔 Eliminar deuda
        </Typography>
        <Typography textAlign="center">¿Estás seguro que quieres borrar la deuda de tu cliente contigo?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              showOptions != null && handleDelete(clientsData[showOptions]);
            }}
          >
            Aceptar
          </Button>
        </Box>
      </ModalResponsive>
    </>
  );
}

function EmptySlot() {
  return (
    <Box sx={{ marginX: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        !Oops¡
      </Typography>
      <Typography variant="body2" color="initial">
        No tienes cobros registrados.
      </Typography>
    </Box>
  );
}

function ErrorSlot() {
  return (
    <Box sx={{ marginX: '8px', textAlign: 'center' }}>
      <Typography variant="subtitle2" color="initial">
        !Oops¡
      </Typography>
      <Typography variant="body2" color="initial">
        No podemos mostrar tus cobros.
      </Typography>
    </Box>
  );
}
