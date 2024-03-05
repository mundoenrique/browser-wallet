'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@mui/material';
//Internal app
import { GroupIcon } from '%/Icons';
import { getSchema } from '@/config';
import SuccessCards from './partial/SuccessCards';
import wallets from '%/images/suppliers/wallets.png';
import SuccessWallets from './partial/SuccessWallets';
import { useMenuStore, useNavTitleStore } from '@/store';
import franchises from '%/images/suppliers/franchises.png';
import { ContainerLayout, InputText, InputTextPay } from '@/components';

export default function Collect() {
  const [showActionBtn, setShowActionBtn] = useState<string>('');
  const { updateTitle } = useNavTitleStore();
  const { setCurrentItem } = useMenuStore();
  const schema = getSchema(['nameClient', 'numberClient', 'amount']);

  const { control, handleSubmit } = useForm({
    defaultValues: { nameClient: '', numberClient: '', amount: '' },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    updateTitle('Crear solicitud de cobro');
    setCurrentItem('collect');
  }, [updateTitle, setCurrentItem]);

  const rcViews: any = {
    wallets: <SuccessWallets />,
    cards: <SuccessCards />,
  };

  const onSubmit = async (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <>
      <ContainerLayout>
        <Typography
          variant="h6"
          color="primary"
          sx={{ color: 'primary.main', mb: 6, display: { xs: 'none ', md: 'block' }, textAlign: 'center' }}
        >
          Crear solicitud de cobro
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputText
            name="numberClient"
            control={control}
            label="¿A quién le quieres cobrar?"
            endAdornment={<GroupIcon />}
          />
          <InputText name="nameClient" control={control} label="Nombre de la persona" endAdornment={<GroupIcon />} />
          <InputTextPay name="amount" control={control} label="¿Cuánto dinero quieres cobrar?" />
          <Typography variant="body1" mb={1}>
            ¿Cómo te va a pagar el cliente?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="payment"
              type="submit"
              sx={{ width: 144, p: 2 }}
              onClick={() => setShowActionBtn('wallets')}
            >
              Billetera digital, Banco o agencia
              <Image src={wallets} alt="Billetas y bancos" />
            </Button>
            <Button
              variant="payment"
              type="submit"
              sx={{ width: 144, p: 2 }}
              onClick={() => {
                setShowActionBtn('cards');
              }}
            >
              Tarjeta de crédito o débito
              <Image src={franchises} alt="Billetas y bancos" />
            </Button>
          </Box>
        </Box>
      </ContainerLayout>

      {rcViews[showActionBtn]}
    </>
  );
}
