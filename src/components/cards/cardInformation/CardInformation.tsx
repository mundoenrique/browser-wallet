'use client';

import { useState } from 'react';
//Internal app
import BackInformation from './components/BackInformation';
import FrontInformation from './components/FrontInformation';
import { BodyCard, BodyCardAction } from './components/BodyCards';
import { BackInformationProps, FrontInformationProps } from '@/interfaces';

/**
 * Shows the 3D card with all the cardholder information
 *
 * @param cardNumber - Card number.
 * @param balance - The available account balance.
 * @param holder - Owner's name.
 * @param expDate - Card expiration date.
 * @param cvc - Shows the cvv2.
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation(props: BackInformationProps & FrontInformationProps): JSX.Element {
  const { cardNumber, balance, holder, expDate, cvc } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <BodyCard>
      <BodyCardAction className={showDetails ? 'active' : undefined}>
        <FrontInformation showDetails={handleShowDetails} cardNumber="4577 ···· ···· 4321" balance="10.000.000.00" />
        <BackInformation
          hideDetails={handleShowDetails}
          holder="Andrea Rodriguez"
          cardNumber="4123 567 098 1234"
          expDate="02/2025"
          cvc="123"
        />
      </BodyCardAction>
    </BodyCard>
  );
}
