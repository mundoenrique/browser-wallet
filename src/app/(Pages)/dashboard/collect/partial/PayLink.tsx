'use client';

import { ListItem, ListItemText, Typography, List } from '@mui/material';

export function PayLink() {
  const items = [
    { label: 'Introduce los datos', description: 'Número de la tarjeta, fecha de vencimiento, y CVV.' },
    { label: 'Verifica', description: 'Asegúrate que la información sea correcta y completa cualquier verificación adicional.' },
    { label: 'Confirma', description: 'Autoriza el pago y espera la confirmación de la transacción.' },
  ];
  return (
    <>
      <Typography variant="subtitle1" mb={2}>
        💸 ¿Cómo me realizarán el pago?
      </Typography>
      <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={
              <>
                <Typography component="span" fontWeight="bold">
                  {`${index + 1}. ${item.label}: `}
                </Typography>
                { item.description }
              </>
            }
          />
        </ListItem>
      ))}
    </List>
    </>
  );

}