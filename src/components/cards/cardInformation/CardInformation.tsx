'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal app
import { useApi } from '@/hooks/useApi';
import { useUiStore, useUserStore } from '@/store';
import ModalOtp from '@/components/modal/ModalOtp';
import BackInformation from './partial/BackInformation';
import FrontInformation from './partial/FrontInformation';
import { BodyCard, BodyCardAction } from './partial/BodyCards';
import { decryptForge, encryptForge } from '@/utils/toolHelper';

const cardTypeQuery = (cardType: string) => {
  const cardObject: { [key: string]: object } = {
    VIRTUAL: {
      decryptData: true,
      cvvNumber: false,
      dynCvvNumber: true,
    },
    PHYSICAL: {
      decryptData: true,
      cvvNumber: true,
      dynCvvNumber: false,
    },
    DEFAULT: {
      decryptData: false,
      cvvNumber: false,
      dynCvvNumber: false,
    },
  };
  return cardObject[cardType] || cardObject['default'];
};

/**
 * Shows the 3D card with all the cardholder information
 *
 * @returns 3D card with all the cardholder information.
 */
export default function CardInformation() {
  const [open, setOpen] = useState<boolean>(false);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const customApi = useApi();

  const {
    getUserCardId,
    user: { userId },
  } = useUserStore();

  const { setModalError, setLoadingScreen } = useUiStore();

  const [cardData, setCardData] = useState<{ [key: string]: string } | null>(null);

  const [cardbackData, setCardBackData] = useState<{ [key: string]: string } | null>(null);

  const [balance, setBalance] = useState<{ [key: string]: string } | null>(null);

  const [cardInformationError, setCardInformationError] = useState<boolean>(false);

  const [balanceError, setBalanceError] = useState<boolean>(false);

  const [otpUuid, setOtpUuid] = useState('');

  const handleShowDetaild = () => {
    setOpen(true);
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      const { otp } = data;

      const payload = {
        otpProcessCode: 'SEE_CARD_NUMBER',
        otpUuId: otpUuid,
        otpCode: encryptForge(otp),
      };
      console.log(payload);
      customApi
        .post(`/users/${userId}/validate/tfa`, payload)
        .then(() => {
          setOpen(false);
          getDecryptData();
        })
        .catch((e) => {
          setModalError({ error: e });
          console.log('optError', e);
        })
        .finally(() => {
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  const getCardInformation = async () => {
    setCardInformationError(false);
    customApi
      .get(`/cards/${getUserCardId()}`)
      .then((response) => {
        setCardData(response.data.data);
      })
      .catch((e) => {
        setCardInformationError(true);
        setModalError({ error: e });
      });
  };

  const getBalance = async () => {
    setBalanceError(false);
    customApi
      .get(`/cards/${getUserCardId()}/balance`)
      .then((response) => {
        setBalance(response.data.data);
      })
      .catch((e) => {
        setBalanceError(true);
        setModalError({ error: e });
      });
  };

  const getDecryptData = async () => {
    setLoadingScreen(true);
    customApi
      .get(`/cards/${getUserCardId()}`, {
        params: {
          ...cardTypeQuery(cardData?.cardType ?? ''),
        },
      })
      .then((response) => {
        setCardBackData(response.data.data);
        setShowDetails(true);
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    getCardInformation();
    getBalance();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (showDetails) {
      setTimeout(() => {
        setShowDetails(false);
      }, 120000);
    }
  }, [showDetails]);

  return (
    <>
      <BodyCard>
        <BodyCardAction className={showDetails ? 'active' : undefined}>
          <FrontInformation
            showDetails={handleShowDetaild}
            cardNumber={cardData?.mask}
            cardStatus={cardData?.cardStatus}
            balance={balance?.availableBalance}
            cardInformationError={cardInformationError}
            balanceError={balanceError}
            fetchCardInformation={getCardInformation}
            fetchBalance={getBalance}
          />
          <BackInformation
            hideDetails={() => setShowDetails(false)}
            holder={cardbackData?.holderName ?? ''}
            cardNumber={showDetails ? (cardbackData?.pan ? decryptForge(cardbackData?.pan) ?? '' : '') : ''}
            expDate={
              showDetails ? (cardbackData?.expiredDate ? decryptForge(cardbackData?.expiredDate) ?? '' : '') : ''
            }
            cvc={showDetails ? (cardbackData?.cvv ? decryptForge(cardbackData?.cvv) : '') : ''}
          />
        </BodyCardAction>
      </BodyCard>

      {open && (
        <ModalOtp
          open={open}
          handleClose={() => setOpen(false)}
          onSubmit={onSubmitOtp}
          setOtpUuid={setOtpUuid}
          processCode="SEE_CARD_NUMBER"
        />
      )}
    </>
  );
}
