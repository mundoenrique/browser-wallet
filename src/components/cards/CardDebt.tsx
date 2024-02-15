'use client';

import Clock from '@mui/icons-material/QueryBuilder';
import ArrowCircle from '@mui/icons-material/ArrowCircleRightOutlined';
import { Avatar, AvatarGroup, Box, Card, Typography } from '@mui/material';
//Internal app
import { fuchsiaBlue, slate } from '@/theme/theme-default';
import { BgButtonPayLarge, BgButtonPaySmall, Esika } from '%/Icons';

export default function CardDebt(props: any) {
  const { OweMe } = props;
  const clientOweMe = ['', '', '', '', '', '', ''];
  const MaxOweMe = clientOweMe.length;

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
      }}
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
            {OweMe ? 'Gestionar' : 'Cobrar'}
          </Typography>
        </Box>
      </Box>
      <Box px={1}>
        <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
          {OweMe ? 'Mis clientes me deben' : 'Mi deuda con ésika'}
        </Typography>
        <Typography variant="h6" noWrap>
          S/ {OweMe ? '720.00' : '350.00'}
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
              <AvatarGroup max={MaxOweMe > 5 ? 5 : MaxOweMe}>
                {clientOweMe.slice(0, 5).map((client, i) => (
                  <Avatar key={i} sx={{ width: 14, height: 14, bgcolor: fuchsiaBlue[400] }} />
                ))}
              </AvatarGroup>

              <Typography fontSize={8}>{MaxOweMe - 5}+ Clientes</Typography>
            </Box>
            <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
          </>
        ) : (
          <>
            <Clock sx={{ fontSize: 12, color: 'primary.main' }} />
            <Typography fontSize={8}>Vence el 31 de Dic 2023</Typography>
            <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} />
          </>
        )}
      </Box>
    </Card>
  );
}
