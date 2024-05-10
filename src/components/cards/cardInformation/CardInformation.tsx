'use client';

import { useCallback, useEffect, useState } from 'react';
//Internal app
import { api } from '@/utils';
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
    default: {
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
  const {
    getUserCardId,
    user: { userId },
  } = useUserStore();
  const { setModalError, setLoadingScreen } = useUiStore();

  const [otpUuid] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<boolean>(false);
  const [balance, setBalance] = useState<{ [key: string]: string } | null>(null);
  const [cardData, setCardData] = useState<{ [key: string]: string } | null>(null);
  const [cardInformationError, setCardInformationError] = useState<boolean>(false);
  const [cardbackData, setCardBackData] = useState<{ [key: string]: string } | null>(null);

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

      api
        .post(`/users/${userId}/validate/tfa`, payload)
        .then((response) => {
          if (response.data.code === '200.00.000') {
            setOpen(false);
            getDecryptData();
          }
        })
        .catch((e) => {
          setModalError({ error: e });
          setLoadingScreen(false);
        });
    },
    [otpUuid] //eslint-disable-line
  );

  const getCardInformation = async () => {
    setCardInformationError(false);
    api
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
    api
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
    api
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
        <ModalOtp open={open} handleClose={() => setOpen(false)} onSubmit={onSubmitOtp} processCode="SEE_CARD_NUMBER" />
      )}
    </>
  );
}
