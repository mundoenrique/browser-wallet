'use client';

import 'dayjs/locale/es';
import { useState, useEffect } from 'react';
import Clock from '@mui/icons-material/QueryBuilder';
import ArrowCircle from '@mui/icons-material/ArrowCircleRightOutlined';
import { Avatar, AvatarGroup, Box, Card, Skeleton, Typography } from '@mui/material';
//Internal app
import { CardDebtProps } from '@/interfaces';
import { expiredFormatDate } from '@/utils/dates';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { BgButtonPayLarge, BgButtonPaySmall, Esika } from '%/Icons';

/**
 * Cards used to show debts on dashboard
 *
 * @param OweMe - Shows the configuration of the clients that must.
 * @param onClick - Confirm and manage the card.
 * @returns Debt balances.
 */
export default function CardDebt(props: CardDebtProps): JSX.Element {
  const { OweMe, onClick, data } = props;
  const maxOweMe = data?.data?.clients || 0;
  const clientOweMe = ['', '', '', '', '', '', ''];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card
      sx={{
        width: 152,
        height: 124,
        boxShadow: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '14px',
        cursor: onClick ? 'pointer' : 'initial',
        bgcolor: fuchsiaBlue[50],
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', height: 28, justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: 10, fontWeight: 600, py: OweMe ? 1 : 1 / 2, px: 1 }}>
          {OweMe ? 'Me deben' : <Esika sx={{ width: '100%' }} />}
        </Typography>
        <Box position="relative">
          {OweMe ? (
            <BgButtonPayLarge sx={{ width: 82, height: 28 }} />
          ) : (
            <BgButtonPaySmall sx={{ width: 66, height: 28 }} />
          )}
          <Typography
            sx={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              fontSize: 10,
              fontWeight: 600,
              color: 'white',
            }}
          >
            {OweMe ? 'Gestionar' : 'Pagar'}
          </Typography>
        </Box>
      </Box>
      <Box px={1}>
        <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
          {OweMe ? 'Mis clientes me deben' : 'Mi deuda con Belcorp'}
        </Typography>
        <Typography variant="h6" noWrap>
          {data?.code === '200.00.000' ? (
            loading ? (
              <Skeleton variant="text" />
            ) : data.data?.amount ? (
              `${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
                data.data?.amount as number
              )}`
            ) : (
              'S/ 0.00'
            )
          ) : loading ? (
            <Skeleton variant="text" />
          ) : (
            'Sin datos'
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: slate[200],
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '6px 8px',
          borderTop: `1px solid ${fuchsiaBlue[400]}`,
        }}
      >
        {OweMe ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 / 2 }}>
              {maxOweMe > 0 && (
                <AvatarGroup max={maxOweMe > 5 ? 5 : maxOweMe}>
                  {clientOweMe.slice(0, maxOweMe > 5 ? 5 : maxOweMe).map((client, i) => (
                    <Avatar key={i} sx={{ width: 14, height: 14, bgcolor: fuchsiaBlue[400] }} />
                  ))}
                </AvatarGroup>
              )}

              <Typography fontSize={8}>
                {!maxOweMe
                  ? 'Datos no disponibles'
                  : data.data?.amount != '0.00'
                  ? `${maxOweMe}+ Clientes`
                  : '0 Clientes'}
              </Typography>
            </Box>
            <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
          </>
        ) : (
          <>
            <Clock sx={{ fontSize: 12, color: 'primary.main' }} />
            <Typography fontSize={8}>
              {data.data?.expirationDate && data.data?.amount != '0.0'
                ? expiredFormatDate(data.data?.expirationDate)
                : 'Datos no disponibles'}
            </Typography>
            <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
          </>
        )}
      </Box>
    </Card>
  );
}
