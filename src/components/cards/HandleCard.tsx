'use client';

import { Box, Card, Avatar } from '@mui/material';
//Internal app
import { HandleCardProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

/**
 * Card designed to display information with an icon and have a function.
 *
 * @param children - Child elements.
 * @param icon - Specifies the icon, used when it has a function..
 * @param onClick - Function that will generate the card.
 * @param large - Card height (@defaultValue `40px`).
 * @param avatar - Icon or image that the avatar will have.
 * @param disabled - Disables the card, accepted when using a function.
 */
export default function HandleCard(props: HandleCardProps): JSX.Element {
  const { children, icon, onClick, large = 40, avatar, disabled } = props;

  return (
    <Card
      sx={{
        boxShadow: 0,
        display: 'flex',
        p: 1,
        cursor: disabled ? 'initial' : 'pointer',
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
