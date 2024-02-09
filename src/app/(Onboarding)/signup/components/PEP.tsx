'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Collapse, Link as LinkMui, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//Internal app
import { useSignupStore } from '@/store/signupStore';
import { InputCheckCondition, InputDatePicker, InputSelect, InputText, ModalResponsive } from '@/components';
import { getSchema } from '@/config';

//TODO:Only for DEV
//import { DevTool } from '@hookform/devtools';

//TODO: Data de ejemplo
const options: any = [
  { text: 'Sí', value: 'true' },
  { text: 'No', value: 'false' },
];

//TODO: Data de ejemplo
const selectOptions = [
  { text: 'Opción A', value: 'A' },
  { text: 'Opción B', value: 'B' },
  { text: 'Opción C', value: 'C' },
  { text: 'Opción D', value: 'D' },
];

export default function PEP() {
  const [isPep, setIsPep] = useState(false);
  const [hasParents, setHasParents] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [parentIndex, setParentIndex] = useState(-1);

  const { dec, inc, updateFormState, pepFormState, setShowHeader } = useSignupStore();

  const schema = isPep ? getSchema(['isPep', 'pepForm', 'relatives']) : getSchema(['isPep']);

  const { control, watch, handleSubmit, getValues, reset } = useForm({
    defaultValues: pepFormState || {
      isPep: null,
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
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relatives',
  });

  const watchIsPep = watch('isPep');
  const WatchIsFamilyAlive = watch('pepForm.isFamilyAlive');

  const onSubmit = (data: any) => {
    console.log(data);
    updateFormState('pepFormState', data);
    inc();
  };

  useEffect(() => {
    watchIsPep && setIsPep(watchIsPep.toLowerCase() === 'true');
    WatchIsFamilyAlive && setHasParents(WatchIsFamilyAlive.toLowerCase() === 'true');

    if (hasParents && !getValues('isAlive')) {
      append({ documentNumber: '', documentType: null, fullName: '' });
    } else {
      remove();
    }

    if (watchIsPep !== null && watchIsPep.toLowerCase() !== 'true') {
      reset({
        isPep: 'false',
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
      });
      remove();
      setHasParents(false);
    }
  }, [watchIsPep, WatchIsFamilyAlive, hasParents, isPep, reset, watch]);

  useEffect(() => {
    setShowHeader(true);
  }, []);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      >
        <Box sx={{ mb: { sm: '24px' }, display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          <Typography variant="subtitle1" align="center">
            Queremos saber más de ti
          </Typography>
          <Typography variant="body2" align="center" sx={{ textDecoration: 'underline' }}>
            ¿Eres una Persona Políticamente Expuesta (PEP)?
            <br />
            ¿Trabajas en entidades gubernamentales?
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
            <InputDatePicker name="pepForm.endDate" label="Fecha" control={control} />

            <Typography variant="body1" align="left" sx={{ marginBottom: '24px' }}>
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

            <Typography variant="body1" align="left" sx={{ marginBottom: '24px' }}>
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
              <InputCheckCondition name="pepForm.isFamilyAlive" options={options} control={control} />
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
                          sx={{ color: '#334155', cursor: 'pointer' }}
                        >
                          Eliminar
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

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
                <Button
                  variant="outlined"
                  sx={{
                    width: '320px',
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
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px', mt: { sm: 2 }, mb: { xs: 3, sm: 0 } }}>
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
        open={showParentModal}
        handleClose={() => {
          setShowParentModal(false);
        }}
      >
        <>
          <Typography variant="subtitle1" sx={{ marginBottom: '24px' }}>
            ✋¿Deseas eliminar este pariente?
          </Typography>
          <Box sx={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
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
        </>
      </ModalResponsive>
    </>
  );
}
