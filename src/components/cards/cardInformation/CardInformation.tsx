'use client';

import { useCallback, useEffect, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
//Internal app
import { api } from '@/utils/api';
import ModalOtp from '@/components/modal/ModalOtp';
import BackInformation from './partial/BackInformation';
import FrontInformation from './partial/FrontInformation';
import { BodyCard, BodyCardAction } from './partial/BodyCards';
import { decryptForge, encryptForge } from '@/utils/toolHelper';
import { useUiStore, useUserStore, useOtpStore, useConfigCardStore, useHeadersStore } from '@/store';

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
  const [open, setOpen] = useState<boolean>(false);

  const host = useHeadersStore((state) => state.host);

  const resetOtp = useOtpStore((state) => state.reset);

  const otpUuid = useOtpStore((state) => state.otpUuid);

  const { userId } = useUserStore((state) => state.user);

  const setModalError = useUiStore((state) => state.setModalError);

  const getUserCardId = useUserStore((state) => state.getUserCardId);

  const setLoadingScreen = useUiStore((state) => state.setLoadingScreen);

  const setReloadFunction = useUiStore((state) => state.setReloadFunction);

  const updateCardInfo = useConfigCardStore((state) => state.updateCardInfo);

  const setCardProperties = useConfigCardStore((state) => state.setCardProperties);

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
        section: 'dashboard',
        previous_section: 'Yiro :: login :: interno',
        selected_content: 'Ver número',
        destination_page: `${host}/dashboard`,
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
          pop_up_type: 'flujo',
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
            resetOtp();
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
        const { cardStatus, cardType, blockType } = response.data.data;
        setCardData(response.data.data);
        setCardProperties('cardStatus', cardStatus);
        setCardProperties('cardType', cardType);
        setCardProperties('blockType', blockType);
        setCardProperties('cardInfo', true);
      })
      .catch((e) => {
        setCardInformationError(true);
        setReloadFunction(() => getCardInformation());
        setModalError({ title: 'Algo salió mal', description: 'No pudimos cargar la información de la tarjeta' });
      });
  };

  const getBalance = async () => {
    setBalance(null);
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
  }, [updateCardInfo]); //eslint-disable-line

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
                  pop_up_type: 'flujo',
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
                pop_up_type: 'flujo',
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
