'use client';

import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Collapse, Link as LinkMui, Typography } from '@mui/material';
//Internal app
import { CardStep } from '..';
import { getSchema } from '@/config';
import { useRegisterStore, useUiStore } from '@/store';
import { slate } from '@/theme/theme-default';
import { InputCheckCondition, InputDatePicker, InputSelect, InputText, ModalResponsive } from '@/components';

const options: any = [
  { text: 'Sí', value: 'true' },
  { text: 'No', value: 'false' },
];

const selectOptions = [
  { text: 'Opción A', value: 'A' },
  { text: 'Opción B', value: 'B' },
  { text: 'Opción C', value: 'C' },
  { text: 'Opción D', value: 'D' },
];

export default function PEP() {
  const [isPep, setIsPep] = useState<boolean>(false);
  const [hasParents, setHasParents] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);
  const [showPepInfo, setShowPepInfo] = useState<boolean>(false);
  const [parentIndex, setParentIndex] = useState<number>(-1);

  const { setLoadingScreen } = useUiStore();

  const { dec, inc, updateFormState, ONB_PHASES_PEP, setShowHeader, onboardingUuid } = useRegisterStore();

  const schema = isPep ? getSchema(['isPep', 'pepForm', 'relatives']) : getSchema(['isPep']);

  const { control, watch, handleSubmit, getValues, reset } = useForm({
    defaultValues: ONB_PHASES_PEP
      ? {
          ...ONB_PHASES_PEP,
          isPep: ONB_PHASES_PEP.isPep ? 'true' : 'false',
          pepForm: {
            ...ONB_PHASES_PEP.pepForm,
            isFamilyAlive: ONB_PHASES_PEP.pepForm.isFamilyAlive ? 'true' : 'false',
            holdShare: ONB_PHASES_PEP.pepForm.holdShare ? 'true' : 'false',
          },
        }
      : {
          isPep: '',
          pepForm: {
            isFamilyAlive: '',
            position: '',
            companyName: '',
            address: '',
            district: null,
            province: null,
            department: null,
            endDate: '',
            holdShare: '',
          },
          relatives: [],
        },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relatives',
  });

  const watchIsPep = watch('isPep');
  const WatchIsFamilyAlive = watch('pepForm.isFamilyAlive');

  const onSubmit = async (data: any) => {
    const requestData = {
      currentPhaseCode: 'ONB_PHASES_PEP',
      onboardingUuId: onboardingUuid,
      request: {
        ...data,
        isPep: data.isPep.toLowerCase() === 'true',
        pepForm: {
          ...data.pepForm,
          isFamilyAlive: data.pepForm.isFamilyAlive.toLowerCase() === 'true',
          holdShare: data.pepForm.holdShare.toLowerCase() === 'true',
        },
      },
    };
    updateFormState('ONB_PHASES_PEP', data);

    setLoadingScreen(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    await fetch('/api/v1/onboarding/pep', { method: 'POST', body: JSON.stringify(requestData) }).then(() => {
      inc();

      setLoadingScreen(false);
    });
  };

  useEffect(() => {
    if (watchIsPep !== '' && watchIsPep.toLowerCase() !== 'true') {
      reset({
        isPep: 'false',
        pepForm: {
          isRelativeAlive: '',
          position: '',
          companyName: '',
          address: '',
          district: null,
          province: null,
          department: null,
          endDate: '',
          holdShare: '',
        },
        relatives: [],
      });
      remove();
      setHasParents(false);
    }
  }, [watchIsPep, hasParents]); //eslint-disable

  useEffect(() => {
    watchIsPep && setIsPep(watchIsPep.toLowerCase() === 'true');
    WatchIsFamilyAlive && setHasParents(WatchIsFamilyAlive.toLowerCase() === 'true');
  }, [watchIsPep, WatchIsFamilyAlive]);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  return (
    <CardStep stepNumber="3">
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      >
        <Box sx={{ mb: { sm: 3 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="subtitle1" align="center" mb={3}>
            Queremos saber más de ti
          </Typography>
          <Typography
            variant="body2"
            sx={{ textDecoration: 'underline', cursor: 'pointer', textAlign: { sm: 'center' } }}
            onClick={() => {
              setShowPepInfo(true);
            }}
          >
            ¿Eres una Persona Políticamente Expuesta (PEP)?
          </Typography>
          <Typography variant="body2" sx={{ textAlign: { sm: 'center' }, mb: 3 }}>
            ¿Ocupas una posición con personas a tu cargo en entidades gubernamentales?
          </Typography>
          <Box>
            <InputCheckCondition name="isPep" options={options} control={control} />
          </Box>

          <Collapse in={isPep} timeout={300}>
            <InputText name="pepForm.position" label="Cargo en la institución pública" control={control} />
            <InputText name="pepForm.companyName" label="Nombre de la institución" control={control} />
            <InputText name="pepForm.address" label="Dirección" control={control} />
            <InputSelect name="pepForm.district" label="Distrito" options={selectOptions} control={control} />
            <InputSelect name="pepForm.province" label="Provincia" options={selectOptions} control={control} />
            <InputSelect name="pepForm.department" label="Departamento" options={selectOptions} control={control} />
            <InputDatePicker name="pepForm.endDate" label="Fecha de salida" control={control} />

            <Typography variant="body2" align="left" sx={{ mb: 3 }}>
              ¿Posees participación, aporte o capital social igual o mayor al 25% en alguna (s) empresa (s)?
            </Typography>
            <Box
              sx={{
                '& .MuiFormGroup-root': {
                  justifyContent: 'center',
                },
              }}
            >
              <InputCheckCondition name="pepForm.holdShare" options={options} control={control} />
            </Box>

            <Typography variant="body2" align="left" sx={{ mb: 3 }}>
              ¿Posee parientes vivos PEP hasta el segundo grado de consanguinidad (padres, hijos, hermanos y nietos) y
              segundo grado de afinidad (cónyuge o conviviente, suegros y cuñados)?
            </Typography>
            <Box
              sx={{
                '& .MuiFormGroup-root': {
                  justifyContent: 'center',
                },
              }}
            >
              <InputCheckCondition
                name="pepForm.isFamilyAlive"
                options={options}
                control={control}
                onClick={(e) => {
                  if (e.target.value === 'true') {
                    append({ documentNumber: '', documentType: null, fullName: '' });
                  } else {
                    remove();
                  }
                }}
              />
            </Box>

            <Collapse in={hasParents} timeout={300}>
              {fields.map((item, index) => (
                <Box key={item.id}>
                  <Box
                    sx={{
                      marginBottom: '24px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="subtitle1">Pariente</Typography>
                    <Box>
                      {index > 0 && (
                        <LinkMui
                          variant="subtitle1"
                          onClick={() => {
                            setParentIndex(index);
                            setShowParentModal(true);
                          }}
                          sx={{ color: slate[700], cursor: 'pointer' }}
                        >
                          Eliminar pariente
                        </LinkMui>
                      )}
                    </Box>
                  </Box>
                  <InputSelect
                    name={`relatives.${index}.documentType`}
                    label="Tipo de documento"
                    options={selectOptions}
                    control={control}
                  />
                  <InputText name={`relatives.${index}.documentNumber`} label="Número de documento" control={control} />
                  <InputText name={`relatives.${index}.fullName`} label="Nombre completo" control={control} />
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  sx={{
                    width: 320,
                  }}
                  onClick={() => {
                    append({ documentType: null, documentNumber: '', fullName: '' });
                  }}
                >
                  Agregar parientes
                </Button>
              </Box>
            </Collapse>
          </Collapse>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 / 2, mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
          <Button
            variant="outlined"
            onClick={() => {
              dec();
            }}
          >
            Anterior
          </Button>
          <Button variant="contained" type="submit">
            Siguiente
          </Button>
        </Box>
      </Box>
      <ModalResponsive
        open={showPepInfo}
        handleClose={() => {
          setShowPepInfo(false);
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          🧑¿Qué es una Persona Expuesta Políticamente(PEP)?
        </Typography>
        <Typography>
          Son aquellas personas que ocupan o han ocupado en los últimos 5 años funciones públicas destacadas o funciones
          prominentes en una organización internacional (en el Perú o en el extranjero) y cuyas circunstancias
          financieras pueden ser objeto de interés público.
        </Typography>
      </ModalResponsive>
      <ModalResponsive
        open={showParentModal}
        handleClose={() => {
          setShowParentModal(false);
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          ✋¿Deseas eliminar este pariente?
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 / 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => {
              setShowParentModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              remove(parentIndex);
              setShowParentModal(false);
            }}
          >
            Aceptar
          </Button>
        </Box>
      </ModalResponsive>
    </CardStep>
  );
}
