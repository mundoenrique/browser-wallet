'use client';

import { useState } from 'react';
//Internal app
import BackInformation from './components/BackInformation';
import FrontInformation from './components/FrontInformation';
import { BodyCard, BodyCardAction } from './components/BodyCards';

/**
 * Shows the 3D card with all the cardholder information
 *
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation() {
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
