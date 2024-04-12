'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Divider, Typography } from '@mui/material';
//internal app
import { CardStep } from '..';
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore, useCatalogsStore } from '@/store';
import { InputCheck, InputText, ModalResponsive, InputSelect, Terms } from '@/components';
import { useApi } from '@/hooks/useApi';

export default function InfoVerification() {
  const customApi = useApi();
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [openTerms, setOpenTerms] = useState<boolean>(false);

  const schema = getSchema(['email', 'terms', 'countryCode']);

  const schemaEmail = getSchema(['email']);
  const schemaPhoneNumber = getSchema(['phoneNumber']);

  const { inc, updateFormState, ONB_PHASES_TERMS, setShowHeader } = useRegisterStore();
  const { setLoadingScreen, loadingScreen } = useUiStore();
  const { updateCatalog, countriesCatalog, termsCatalog } = useCatalogsStore();

  const setTermsValue = useCallback(
    (term: any) => {
      if (ONB_PHASES_TERMS?.terms && termsCatalog.length > 0) {
        const code: any = termsCatalog.find((el) => {
          return el.value == term;
        });

        if (!code) {
          return false; // Si el término no existe, retornar false
        }
        return ONB_PHASES_TERMS.terms.some((el: any) => {
          return el.code === code.code;
        });
      }
    },
    [termsCatalog, ONB_PHASES_TERMS]
  );

  useEffect(() => {
    setValue('terms', setTermsValue('TERMINO 1'));
    setValue('policy', setTermsValue('TERMINO 2'));
  }, [setTermsValue, termsCatalog, ONB_PHASES_TERMS]); //eslint-disable-line

  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      countryCode: ONB_PHASES_TERMS?.consultant?.countryCode ?? '',
      phoneNumber: ONB_PHASES_TERMS?.consultant?.phoneNumber ?? '',
      email: ONB_PHASES_TERMS?.consultant?.email ?? '',
      terms: false,
      policy: false,
    },
    resolver: yupResolver(schema),
  });

  //Create Email form
  const {
    control: controlEmail,
    handleSubmit: handleSubmitEmail,
    setValue: setValueEmail,
    clearErrors: clearErrorsEmail,
  } = useForm({
    defaultValues: {
      email: getValues('email'),
    },
    resolver: yupResolver(schemaEmail),
  });

  //Create phoneNumber form
  const {
    control: controlPhoneNumber,
    handleSubmit: handleSubmitPhoneNumber,
    setValue: setValuePhoneNumber,
    clearErrors: clearErrorsPhoneNumber,
  } = useForm({
    defaultValues: {
      phoneNumber: getValues('phoneNumber'),
    },
    resolver: yupResolver(schemaPhoneNumber),
  });

  /**
   * Send Form data
   *  @param data - Form data
   */
  const onSubmit = async (data: any) => {
    const termsObject: { [key: string]: boolean } = {
      'TERMINO 1': data.terms,
      'TERMINO 2': data.policy,
    };

    const { uuid, ...consultantData } = ONB_PHASES_TERMS?.consultant;

    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_TERMS',
      ...(ONB_PHASES_TERMS?.consultant?.uuid && { uuid: ONB_PHASES_TERMS?.consultant.uuid }),
      request: {
        consultant: {
          ...consultantData,
          countryCode: data.countryCode,
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
        terms: termsCatalog.reduce((acc: any[], e) => {
          termsObject[e.value] && acc.push({ code: e.code });
          return acc;
        }, []),
      },
    };
    console.log('send Terms Form', requestFormData);

    setLoadingScreen(true);
    await customApi
      .post('/onboarding/termsandconditions', requestFormData)
      .then((response) => {
        console.log('termsAndCondition response', response);
        updateFormState('ONB_PHASES_TERMS', requestFormData.request);
        updateFormState('onboardingUuId', response.data.data.onboardingUuId);
        inc();
      })
      .catch((error) => {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  const handleModalTerm = (e: any) => {
    e.preventDefault();
    setOpenTerms(true);
  };

  //Method For set email value
  const handleEditEmail = async (data: any) => {
    setValue('email', data.email);
    setEditEmail(false);
  };

  //Method For set PhoneNumber value
  const handlePhoneNumber = async (data: any) => {
    setValue('phoneNumber', data.phoneNumber);
    setEditPhoneNumber(false);
  };

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  /**
   * Fetch country Catalog
   */

  useEffect(() => {
    const retrieveCountryList = async () => {
      try {
        const countries = await customApi.post(`/catalogs/search`, {
          catalogCode: 'COUNTRIES_CATALOG',
        });
        updateCatalog(
          'countriesCatalog',
          countries.data.data.data.map((country: { value: string; code: string }) => ({
            text: country.value,
            value: country.code.slice(0, 2),
          }))
        );
      } catch (error) {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      }
    };
    {
      countriesCatalog.length === 0 && retrieveCountryList();
    }
  }, []); //eslint-disable-line

  /**
   * Fetch Terms Catalog
   */

  useEffect(() => {
    const retrieveTermsList = async () => {
      try {
        const terms = await customApi.post(`/catalogs/search`, {
          catalogCode: 'TERMS_AND_CONDITIONS_CATALOG',
          parameters: [
            {
              code: 'TERMS_CATEGORY',
              value: 'ONB_PHASES_TERMS',
            },
          ],
        });
        updateCatalog('termsCatalog', terms.data.data.data);
      } catch (error) {
        throw new Error('Error in apiGee request handling: ' + (error as Error).message);
      }
    };
    retrieveTermsList();
  }, []); //eslint-disable-line

  return (
    <CardStep stepNumber="1">
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              ¡Hola {ONB_PHASES_TERMS ? ONB_PHASES_TERMS.consultant?.firstName : ''}!
            </Typography>
            <Typography variant="subtitle1">Empecemos verificando tu información personal</Typography>
          </Box>

          <Card sx={{ p: '8px 0px', boxShadow: 'none', mb: 2 }}>
            <Box sx={{ px: 5 / 2, pb: 3 / 2 }}>
              <Typography variant="subtitle2">
                {ONB_PHASES_TERMS ? ONB_PHASES_TERMS.consultant?.firstName : ''}{' '}
                {ONB_PHASES_TERMS ? ONB_PHASES_TERMS.consultant?.lastName : ''}
              </Typography>
              <Typography variant="subtitle2">
                {ONB_PHASES_TERMS ? `${ONB_PHASES_TERMS.consultant?.documentType}:` : ''}{' '}
                {ONB_PHASES_TERMS ? ONB_PHASES_TERMS.consultant?.documentNumber : ''}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ px: 5 / 2, pt: 3 / 2 }}>
              {countriesCatalog.length > 0 ? (
                <InputSelect
                  name="countryCode"
                  label="Nacionalidad"
                  options={countriesCatalog}
                  control={control}
                  disableClearable
                />
              ) : (
                <InputSelect name="default" label="Nacionalidad" options={[]} disableClearable disabled />
              )}
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                px: 5 / 2,
                py: 3 / 2,
              }}
            >
              <Box>
                <Typography variant="body2">Número de celular:</Typography>
                <Typography variant="body2">{control._formValues.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Chip
                  variant="signup"
                  label="Editar"
                  onClick={() => {
                    setEditPhoneNumber(true);
                  }}
                />
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                px: 5 / 2,
                pt: 3 / 2,
              }}
            >
              <Box>
                <Typography variant="body2">Email:</Typography>
                <Typography variant="body2">{control._formValues.email} </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Chip
                  variant="signup"
                  label="Editar"
                  onClick={() => {
                    setEditEmail(true);
                  }}
                />
              </Box>
            </Box>
          </Card>
          <InputCheck
            name="terms"
            labelHandle="Acepto Términos y Condiciones y Política de Privacidad de Datos"
            control={control}
            onClick={handleModalTerm}
          />
          <InputCheck name="policy" label="Autorizo el envío de publicidad" control={control} />
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: { xs: 'auto', sm: 320 }, mb: { xs: 3, sm: 0 }, mx: { sm: 'auto' } }}
          fullWidth
          disabled={loadingScreen}
        >
          Continuar
        </Button>
      </Box>

      <ModalResponsive
        open={editPhoneNumber}
        handleClose={() => {
          clearErrorsPhoneNumber('phoneNumber');
          setValuePhoneNumber('phoneNumber', getValues('phoneNumber'));
          setEditPhoneNumber(false);
        }}
      >
        <Box component="form" autoComplete="off" onSubmit={handleSubmitPhoneNumber(handlePhoneNumber)}>
          <Typography variant="subtitle1" mb="12px">
            📱 Editar número de celular
          </Typography>
          <InputText name="phoneNumber" label="Ingresa tu nuevo número de celular" control={controlPhoneNumber} />
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </ModalResponsive>

      <ModalResponsive
        open={editEmail}
        handleClose={() => {
          clearErrorsEmail('email');
          setValueEmail('email', getValues('email'));
          setEditEmail(false);
        }}
      >
        <Box component="form" autoComplete="off" onSubmit={handleSubmitEmail(handleEditEmail)}>
          <Typography variant="subtitle1" mb="12px">
            ✉️ Editar email
          </Typography>
          <InputText name="email" label="Ingresa tu nuevo email" control={controlEmail} />
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Box>
      </ModalResponsive>

      <ModalResponsive
        open={openTerms}
        handleClose={() => {
          setOpenTerms(false);
        }}
        sx={{
          width: { sm: '90vw', xs: '100%' },
          maxWidth: { sm: 800, xs: '100%' },
          height: { sm: '90vh', xs: '80vh' },
          maxHeight: { sm: 600, xs: '80vh' },
        }}
      >
        <Box sx={{ height: '90%', overflow: 'auto' }}>
          <Terms />
        </Box>
      </ModalResponsive>
    </CardStep>
  );
}
