'use client';

import 'dayjs/locale/es';
import { useState, useEffect } from 'react';
import Clock from '@mui/icons-material/QueryBuilder';
import { Box, Card, Skeleton, Typography } from '@mui/material';
import ArrowCircle from '@mui/icons-material/ArrowCircleRightOutlined';
//Internal app
import { CardDebtProps } from '@/interfaces';
import { expiredFormatDate } from '@/utils/dates';
import { BgButtonPaySmall, Esika } from '%/Icons';
import { fuchsiaBlue, slate } from '@/theme/theme-default';

/**
 * Cards used to show debts on dashboard
 *
 * @param onClick - Confirm and manage the card.
 * @returns Debt balances.
 */
export default function CardDebt(props: CardDebtProps): JSX.Element {
  const { onClick, data } = props;
  const noDebt = data.data?.expirationDate && data.data?.amount != '0.0';
  const [loading, setLoading] = useState(true);
  const [balanceColor, setBalanceColor] = useState<string>('#33415');
  const [newAmount, setNewAmount] = useState<number>(0);
  const [isNegativeAmount, setIsNegativeAmount] = useState<boolean>(false);

  const validateAmount = () => {
    if (data.data?.amount && Number(data.data?.amount) < 0) {
      setIsNegativeAmount(true);
      setBalanceColor('#307E0D');
      setNewAmount(Math.abs(data.data?.amount as number));
    } else {
      setIsNegativeAmount(false);
      setBalanceColor('#334155');
      setNewAmount(data.data?.amount as number);
    }
  };

  const returnAmount = () => {
    if (isNegativeAmount) {
      return `${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(newAmount)}`;
    } else {
      return `${Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
        data.data?.amount as number
      )}`;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    validateAmount();
  }, [data.data.amount]);

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
        <Typography sx={{ fontSize: 10, fontWeight: 600, py: 1 / 2, px: 1 }}>
          {data.data?.amount != 0.0 ? <Esika sx={{ width: '100%' }} /> : 'Tu saldo está al día'}
        </Typography>

        {data.data?.amount != 0.0 ? (
          <Box position="relative">
            <BgButtonPaySmall sx={{ width: 66, height: 28 }} />
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
              Pagar
            </Typography>
          </Box>
        ) : (
          ''
        )}
      </Box>
      <Box px={1}>
        <Typography sx={{ fontSize: 10, fontWeight: 400 }}>
          {isNegativeAmount ? 'Tienes un saldo a favor' : 'Mi deuda con Belcorp'}
        </Typography>
        <Typography variant="h6" noWrap sx={{ color: balanceColor }}>
          {data?.code === '200.00.000' ? (
            loading ? (
              <Skeleton variant="text" />
            ) : data.data?.amount ? (
              returnAmount()
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
        <Clock sx={{ fontSize: 12, color: 'primary.main' }} />
        <Typography fontSize={8} sx={{ width: '100%', pl: 1 }}>
          {!isNegativeAmount || data.data?.amount === '0.0'
            ? noDebt
              ? expiredFormatDate(data.data?.expirationDate ?? '')
              : 'Vencimiento no disponible'
            : 'Estás al día en tus pagos'}
        </Typography>
        {noDebt ? <ArrowCircle sx={{ fontSize: 12, color: 'primary.main' }} /> : <></>}
      </Box>
    </Card>
  );
}
