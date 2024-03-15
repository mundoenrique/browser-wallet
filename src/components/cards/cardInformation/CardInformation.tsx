'use client';

import { useState } from 'react';
//Internal app
import ModalOtp from '@/components/modal/ModalOtp';
import BackInformation from './partial/BackInformation';
import FrontInformation from './partial/FrontInformation';
import { BodyCard, BodyCardAction } from './partial/BodyCards';

/**
 * Shows the 3D card with all the cardholder information
 *
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation() {
  const [open, setOpen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetaild = () => {
    setOpen(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpen(false);
    setShowDetails(true);
  };

  return (
    <>
      <BodyCard>
        <BodyCardAction className={showDetails ? 'active' : undefined}>
          <FrontInformation showDetails={handleShowDetaild} cardNumber="4577 ···· ···· 4321" balance="10.000.000.00" />
          <BackInformation
            hideDetails={() => setShowDetails(false)}
            holder="Andrea Rodriguez"
            cardNumber="4123 567 098 1234"
            expDate="02/2025"
            cvc="123"
          />
        </BodyCardAction>
      </BodyCard>

      <ModalOtp open={open} handleClose={() => setOpen(false)} onSubmit={onSubmitOtp} />
    </>
  );
}
