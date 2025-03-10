'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import ModalOtp from '@/components/modal/ModalOtp';
import BackInformation from './partial/BackInformation';
import FrontInformation from './partial/FrontInformation';
import { BodyCard, BodyCardAction } from './partial/BodyCards';
import { decryptForge, encryptForge } from '@/utils/toolHelper';
import { useUiStore, useUserStore, useOtpStore, useConfigCardStore, useDebStore, useHeadersStore } from '@/store';

const cardTypeQuery = (cardType: string) => {
  const cardObject: { [key: string]: object } = {
    VIRTUAL: {
      decryptData: true,
      cvvNumber: true,
      dynCvvNumber: false,
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
  const path = usePathname();

  const [open, setOpen] = useState<boolean>(false);

  const host = useHeadersStore((state) => state.host);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId, cardSolutions } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const setCardProperties = useConfigCardStore((state) => state.setCardProperties);

  const setBalanceStoreDebt = useDebStore((state) => state.setBalance);

  const [showDetails, setShowDetails] = useState<boolean>(false);

  const [balanceError, setBalanceError] = useState<boolean>(false);

  const [cardData, setCardData] = useState<{ [key: string]: any } | null>(null);

  const [balance, setBalance] = useState<{ [key: string]: string } | null>(null);

  const [cardInformationError, setCardInformationError] = useState<boolean>(false);

  const [cardbackData, setCardBackData] = useState<{ [key: string]: string } | null>(null);

  const handleShowDetaild = () => {
    setOpen(true);
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'select_content',
      eventParams: {
        content_type: 'boton',
        section: path === '/dashboard' ? 'dashboard' : 'Yiro :: configuracionTarjeta :: menu',
        previous_section: path === '/dashboard' ? 'Yiro :: login :: interno' : 'dashboard',
        selected_content: 'Ver número',
        destination_page: path === '/dashboard' ? `${host}/dashboard` : `${host}/dashboard/card-configuration/menu `,
      },
    });
  };

  const onSubmitOtp = useCallback(
    async (data: any) => {
      setLoadingScreen(true);
      sendGTMEvent({
        event: 'ga4.trackEvent',
        eventName: 'select_content',
        eventParams: {
          content_type: 'boton_modal',
          section: 'dashboard',
          previous_section: 'Yiro :: login :: interno',
          selected_content: 'Verificar',
          destination_page: `${host}/dashboard`,
          pop_up_type: 'login',
          pop_up_title: 'Verificación en dos pasos',
        },
      });

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
    setCardData(null);
    setCardInformationError(false);
    api
      .get(`/cards/${getUserCardId()}`)
      .then((response) => {
        setCardData(response.data.data);
        setCardProperties('cardInformation', response.data.data);
      })
      .catch((e) => {
        setCardInformationError(true);
        setModalError({ title: 'Algo salió mal', description: 'No pudimos cargar la información de la tarjeta' });
      });
  };

  const getBalance = async () => {
    setBalance(null);
    setBalanceError(false);
    setBalanceStoreDebt(null);
    api
      .get(`/cards/${getUserCardId()}/balance`)
      .then((response) => {
        setBalance(response.data.data);
        setBalanceStoreDebt(response.data.data);
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
    if (showDetails) {
      setTimeout(() => {
        setShowDetails(false);
      }, 120000);
    }
  }, [showDetails]);

  useEffect(() => {
    getCardInformation();
    getBalance();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getCardInformation();
  }, [cardSolutions]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <BodyCard>
        <BodyCardAction className={showDetails ? 'active' : undefined}>
          <FrontInformation
            showDetails={handleShowDetaild}
            cardNumber={cardData?.mask}
            cardStatus={cardData?.blockType}
            balance={balance?.availableBalance}
            cardInformationError={cardInformationError}
            balanceError={balanceError}
          />
          <BackInformation
            hideDetails={() => {
              setShowDetails(false);
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton_modal',
                  section: 'dashboard',
                  previous_section: 'Yiro :: login :: interno',
                  selected_content: 'Cerrar',
                  destination_page: `${host}/dashboard`,
                  pop_up_type: 'login',
                  pop_up_title: 'Información de la tarjeta',
                },
              });
            }}
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
          handleClose={() => {
            setOpen(false);
            sendGTMEvent({
              event: 'ga4.trackEvent',
              eventName: 'select_content',
              eventParams: {
                section: 'dashboard',
                previous_section: 'Yiro :: login :: interno',
                pop_up_type: 'login',
                pop_up_title: 'Verificación en dos pasos',
                content_type: 'modal',
              },
            });
          }}
          onSubmit={onSubmitOtp}
          processCode="SEE_CARD_NUMBER"
        />
      )}
    </>
  );
}
