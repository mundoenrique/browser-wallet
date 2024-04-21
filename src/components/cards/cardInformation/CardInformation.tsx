'use client';

import { useEffect, useState } from 'react';
//Internal app
import ModalOtp from '@/components/modal/ModalOtp';
import BackInformation from './partial/BackInformation';
import FrontInformation from './partial/FrontInformation';
import { BodyCard, BodyCardAction } from './partial/BodyCards';
import { useApi } from '@/hooks/useApi';

/**
 * Shows the 3D card with all the cardholder information
 *
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation() {
  const [open, setOpen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const customApi = useApi();

  const [cardData, setCardData] = useState<cardResponse | null>(null);
  const [balance, setBalance] = useState<{ [key: string]: string } | null>(null);

  interface cardResponse {
    accountNumber: string;
    blockType: {};
    cardStatus: 'ACTIVE' | 'INACTIVE';
    cardToken: string;
    cardType: 'VIRTUAL' | 'PHYSIC';
    holderName: string;
    mask: string;
    userToken: string;
  }

  const handleShowDetaild = () => {
    setOpen(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpen(false);
    setShowDetails(true);
  };

  useEffect(() => {
    customApi.get('/cards/fd7d7993-53e5-45da-a7b5-d26481741466').then((response) => {
      setCardData(response.data.data);
    });
    customApi.get('/cards/fd7d7993-53e5-45da-a7b5-d26481741466/balance').then((response) => {
      setBalance(response.data.data);
    });
  }, []);

  return (
    <>
      <BodyCard>
        <BodyCardAction className={showDetails ? 'active' : undefined}>
          <FrontInformation
            showDetails={handleShowDetaild}
            cardNumber={cardData?.mask}
            balance={balance?.currentBalance}
          />
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
