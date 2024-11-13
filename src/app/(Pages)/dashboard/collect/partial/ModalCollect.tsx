'use client';

import { useEffect } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { PayCash } from './PayCash';
import { PayLink } from './PayLink';
import { MuiModalProps } from '@/interfaces';
import { ModalResponsive } from '@/components';

export function ModalCollect(props: Readonly<MuiModalProps>) {
  const { type, open, handleClose } = props;

  useEffect(() => {
    if (open) {
      sendGTMEvent({
        event: 'ga4.trackEvent',
        eventName: 'view_popup',
        eventParams: {
          section: 'cobrar :: realizarOperacion :: pagoEfectivo',
          previous_section: 'cobrar',
          pop_up_type: 'Cobro',
          pop_up_title: '¿Cómo me realizarán el pago?',
          content_type: 'modal',
        },
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalResponsive open={open} handleClose={handleClose}>
      {type === 'wallet' ? <PayCash /> : <PayLink />}
    </ModalResponsive>
  );
}
