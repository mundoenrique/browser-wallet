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

  const [cardData, setCardData] = useState<{ [key: string]: string } | null>(null);
  const [balance, setBalance] = useState<{ [key: string]: string } | null>(null);
  const [cardInformationError, setCardInformationError] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<boolean>(false);

  const handleShowDetaild = () => {
    setOpen(true);
  };

  const onSubmitOtp = async (data: any) => {
    console.log(data);
    setOpen(false);
    setShowDetails(true);
  };
  const fetchCardInformation = () => {
    setCardInformationError(false);
    customApi
      .get('/cards/fd7d7993-53e5-45da-a7b5-d26481741466')
      .then((response) => {
        setCardData(response.data.data);
      })
      .catch(() => {
        setCardInformationError(true);
      });
  };

  const fetchBalance = () => {
    setBalanceError(false);
    customApi
      .get('/cards/fd7d7993-53e5-45da-a7b5-d26481741466/balance')
      .then((response) => {
        setBalance(response.data.data);
      })
      .catch(() => {
        setBalanceError(true);
      });
  };

  useEffect(() => {
    fetchCardInformation();
    fetchBalance();
  }, []); //eslint-disable-line

  return (
    <>
      <BodyCard>
        <BodyCardAction className={showDetails ? 'active' : undefined}>
          <FrontInformation
            showDetails={handleShowDetaild}
            cardNumber={cardData?.mask}
            balance={balance?.currentBalance}
            cardInformationError={cardInformationError}
            balanceError={balanceError}
            fetchCardInformation={fetchCardInformation}
            fetchBalance={fetchBalance}
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
