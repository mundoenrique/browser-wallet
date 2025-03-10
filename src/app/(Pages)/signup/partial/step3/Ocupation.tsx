'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendGTMEvent } from '@next/third-parties/google';
import { Box, Button, Collapse, Typography } from '@mui/material';
//Internal app
import { api } from '@/utils/api';
import CardStep from '../CardStep';
import { getSchema } from '@/config';
import { InputSelect, InputText } from '@/components';
import { useRegisterStore, useUiStore, useCatalogsStore, useHeadersStore } from '@/store';

export default function Ocupation() {
  const [ocupations, setOcupations] = useState<boolean>(false);

  const host = useHeadersStore((state) => state.host);

  const { updateCatalog, occupationCatalog } = useCatalogsStore();

  const { setLoadingScreen, loadingScreen, setModalError } = useUiStore();

  const { updateStep, inc, updateFormState, ONB_PHASES_CONSULT_DATA, onboardingUuId } = useRegisterStore();

  const schema = ocupations
    ? getSchema(['occupationCode', 'companyType', 'companyName', 'companyPosition'])
    : getSchema(['ocupation']);

  const { handleSubmit, control, watch, reset, getValues } = useForm({
    defaultValues: {
      occupationCode: ONB_PHASES_CONSULT_DATA?.consultant?.occupationCode ?? 'SELF_CONSULT_BEAUTY',
      companyType: ONB_PHASES_CONSULT_DATA?.consultant?.companyType ?? null,
      companyName: ONB_PHASES_CONSULT_DATA?.consultant?.companyName ?? '',
      companyPosition: ONB_PHASES_CONSULT_DATA?.consultant?.companyPosition ?? '',
    },
    resolver: yupResolver(schema),
  });

  const personOcupation = watch('occupationCode');

  useEffect(() => {
    sendGTMEvent({
      event: 'ga4.trackEvent',
      eventName: 'page_view_ga4',
      eventParams: {
        page_location: `${host}/signup/onboarding/step3-1`,
        page_title: 'Yiro :: onboarding :: step3 :: 3.1ocupacion',
        page_referrer: `${host}/signup/onboarding/step2`,
        section: 'Yiro :: onboarding :: step3 :: 3.1ocupacion',
        previous_section: 'Yiro :: onboarding :: step2',
      },
    });
  }, [host]);

  useEffect(() => {
    if (['SELF_CONSULT_BEAUTY'].includes(personOcupation)) {
      setOcupations(false);
      reset({
        ...getValues(),
        companyType: null,
        companyName: '',
        companyPosition: '',
      });

      sendGTMEvent({
        event: 'ga4.trackEvent',
        eventName: 'page_view_ga4',
        eventParams: {
          page_location: `${host}/signup/onboarding/step3-2`,
          page_title: 'Yiro :: onboarding :: step3 :: 3.2consultora',
          page_referrer: `${host}/signup/onboarding/step2`,
          section: 'Yiro :: onboarding :: step3 :: 3.2consultora',
          previous_section: 'Yiro :: onboarding :: step2',
        },
      });
    } else {
      setOcupations(true);
      sendGTMEvent({
        event: 'ga4.trackEvent',
        eventName: 'page_view_ga4',
        eventParams: {
          page_location: `${host}/signup/onboarding/step3-2`,
          page_title: 'Yiro :: onboarding :: step3 :: 3.2noConsultora',
          page_referrer: `${host}/signup/onboarding/step2`,
          section: 'Yiro :: onboarding :: step3 :: 3.2noConsultora',
          previous_section: 'Yiro :: onboarding :: step2',
        },
      });
    }
  }, [getValues, host, personOcupation, reset]);

  const onSubmit = async (data: any) => {
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_CONSULT_DATA',
      onboardingUuId: onboardingUuId,
      request: {
        consultant: {
          occupationCode: data.occupationCode,
          ...(ocupations && {
            companyType: data.companyType,
            companyName: data.companyName,
            companyPosition: data.companyPosition,
          }),
        },
      },
    };

    setLoadingScreen(true);

    api
      .put('/onboarding/consultantdata', requestFormData)
      .then(() => {
        updateFormState('ONB_PHASES_CONSULT_DATA', requestFormData.request);
        inc();
      })
      .catch((e) => {
        setModalError({ error: e });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  useEffect(() => {
    const fetchOccupationsCatalg = async () => {
      api
        .post('/catalogs/search', { catalogCode: 'OCCUPATIONS_CATALOG' })
        .then((response) => {
          updateCatalog(
            'occupationCatalog',
            response.data.data.data.map((occupation: { value: string; code: string }) => ({
              text: occupation.value,
              value: occupation.code,
            }))
          );
        })
        .catch((e) => {
          setModalError({ error: e });
        });
    };
    {
      occupationCatalog.length === 0 && fetchOccupationsCatalg();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CardStep stepNumber="3">
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      >
        <Box sx={{ mb: { sm: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
            Queremos saber más de ti
          </Typography>
          <Box>
            {occupationCatalog.length > 0 ? (
              <InputSelect
                name="occupationCode"
                label="¿Cuál es tu ocupación?"
                disableClearable
                options={occupationCatalog}
                control={control}
              />
            ) : (
              <InputSelect name="default" label="¿Cuál es tu ocupación?" options={[]} disableClearable disabled />
            )}
            <Collapse in={ocupations} timeout={300}>
              <InputSelect
                name="companyType"
                label="Tipo de empresa"
                disableClearable
                options={[
                  { text: 'Privada', value: 'Privado' },
                  { text: 'Pública', value: 'Publico' },
                ]}
                control={control}
              />
              <InputText name="companyName" label="Nombre empresa" control={control} />
              <InputText name="companyPosition" label="Cargo empresa" control={control} />
            </Collapse>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
          <Button
            variant="outlined"
            onClick={() => {
              updateStep(1);
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: ocupations
                    ? 'Yiro :: onboarding :: step3 :: 3.1ocupacion'
                    : 'Yiro :: onboarding :: step3 :: 3.2noConsultora',
                  previous_section: 'Yiro :: onboarding :: step2',
                  selected_content: 'Anterior',
                  destination_page: `${host}/signup/onboarding/step3-2`,
                },
              });
            }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loadingScreen}
            onClick={() => {
              sendGTMEvent({
                event: 'ga4.trackEvent',
                eventName: 'select_content',
                eventParams: {
                  content_type: 'boton',
                  section: ocupations
                    ? 'Yiro :: onboarding :: step3 :: 3.1ocupacion'
                    : 'Yiro :: onboarding :: step3 :: 3.2noConsultora',
                  previous_section: 'Yiro :: onboarding :: step2',
                  selected_content: 'Siguiente',
                  destination_page: `${host}/signup/onboarding/step3-2`,
                },
              });
            }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </CardStep>
  );
}
