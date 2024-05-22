'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import updateLocale from 'dayjs/plugin/updateLocale';
import Clock from '@mui/icons-material/QueryBuilder';
import ArrowCircle from '@mui/icons-material/ArrowCircleRightOutlined';
import { Avatar, AvatarGroup, Box, Card, Typography } from '@mui/material';
//Internal app
import { CardDebtProps } from '@/interfaces';
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { BgButtonPayLarge, BgButtonPaySmall, Esika } from '%/Icons';

/**
 * Cards used to show debts on dashboard
 *
 * @param OweMe - Shows the configuration of the clients that must.
 * @param onClick - Confirm and manage the card.
 * @returns Debt balances.
 */

dayjs.locale('es');
dayjs.extend(updateLocale);
dayjs.updateLocale('es', {
  monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
});

function Avatars({ MaxOweMe }: { MaxOweMe: number }) {
  const clientOweMe = ['', '', '', '', '', '', ''];
  if (MaxOweMe > 5) {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 / 2 }}>
          <AvatarGroup max={MaxOweMe > 5 ? 5 : MaxOweMe}>
            {clientOweMe.slice(0, 5).map((client, i) => (
              <Avatar key={i} sx={{ width: 14, height: 14, bgcolor: fuchsiaBlue[400] }} />
            ))}
          </AvatarGroup>

          <Typography fontSize={8}>{MaxOweMe - 5}+ Clientes</Typography>
        </Box>
        <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
      </>
    );
  } else {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 / 2 }}>
          <AvatarGroup max={MaxOweMe}>
            {clientOweMe.slice(0, MaxOweMe).map((client, i) => (
              <Avatar key={i} sx={{ width: 14, height: 14, bgcolor: fuchsiaBlue[400] }} />
            ))}
          </AvatarGroup>
          {!MaxOweMe && <Typography fontSize={8}>Datos no disponibles</Typography>}
        </Box>
        <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
      </>
    );
  }
}

export default function CardDebt(props: CardDebtProps): JSX.Element {
  const { OweMe, onClick, data } = props;
  const MaxOweMe = data?.clients || 0;
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
          {OweMe ? 'Mis clientes me deben' : 'Mi deuda con ésika'}
        </Typography>
        <Typography variant="h6" noWrap>
          {data.amount ? `S/ ${data?.amount}` : 'Sin datos'}
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
          <Avatars MaxOweMe={MaxOweMe} />
        ) : (
          <>
            <Clock sx={{ fontSize: 12, color: 'primary.main' }} />
            <Typography fontSize={8}>
              {data.expirationDate
                ? dayjs(data?.expirationDate, 'DD/MM/YYYY').format('[Vence el] D [de] MMM YYYY')
                : 'Datos no disponibles'}
            </Typography>
            <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
          </>
        )}
      </Box>
    </Card>
  );
}
