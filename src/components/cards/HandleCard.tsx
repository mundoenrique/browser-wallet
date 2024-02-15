'use client';

import { Box, Card, Avatar } from '@mui/material';
//Internal app
import { HandleCardProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

export default function HandleCard(props: HandleCardProps) {
  const { children, icon, onClick, large = 40, avatar, disabled } = props;

  return (
    <Card
      sx={{
        boxShadow: 0,
        display: 'flex',
        p: 1,
        cursor: onClick ? (disabled ? 'initial' : 'pointer') : 'initial',
        minHeight: large,
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: disabled ? 0.4 : 1,
      }}
      onClick={disabled ? undefined : onClick}
    >
      <Box sx={{ display: 'flex' }}>
        <Avatar sx={{ bgcolor: fuchsiaBlue[200], width: 26, height: 26, mr: 1 }}>{avatar}</Avatar>
        <Box sx={{ display: 'grid', alignItems: 'center' }}>{children}</Box>
      </Box>
      {icon}
    </Card>
  );
}
