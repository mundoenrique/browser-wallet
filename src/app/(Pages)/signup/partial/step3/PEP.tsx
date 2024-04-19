'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Collapse, Link as LinkMui, Typography } from '@mui/material';
//Internal app
import { CardStep } from '..';
import { getSchema } from '@/config';
import { useApi } from '@/hooks/useApi';
import { slate } from '@/theme/theme-default';
import { useRegisterStore, useUiStore, useCatalogsStore } from '@/store';
import { InputCheckCondition, InputDatePicker, InputSelect, InputText, ModalResponsive } from '@/components';

//Optios to map to <inputCheck >. Don't delete
const options: any = [
  { text: 'Sí', value: 'true' },
  { text: 'No', value: 'false' },
];

export default function PEP() {
  const [isPep, setIsPep] = useState<boolean>(false);
  const [hasParents, setHasParents] = useState<boolean>(false);
  const [showParentModal, setShowParentModal] = useState<boolean>(false);
  const [showPepInfo, setShowPepInfo] = useState<boolean>(false);
  const [parentIndex, setParentIndex] = useState<number>(-1);

  const maxDate = dayjs();
  const minDate = maxDate.subtract(10, 'years');

  const customApi = useApi();

  const { setLoadingScreen, setModalError } = useUiStore();

  const { updateCatalog, departamentsCatalog, provincesCatalog, districtsCatalog, documentTypesCatalog } =
    useCatalogsStore();

  const { dec, inc, updateFormState, ONB_PHASES_PEP, setShowHeader, onboardingUuId } = useRegisterStore();

  const schema = isPep ? getSchema(['isPep', 'pepForm', 'relatives']) : getSchema(['isPep']);

  const { control, watch, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      isPep: ONB_PHASES_PEP?.isPep.toString() ?? '',
      pepForm: {
        isRelativeAlive: ONB_PHASES_PEP?.pepForm?.isRelativeAlive.toString() ?? '',
        position: ONB_PHASES_PEP?.pepForm?.position ?? '',
        companyName: ONB_PHASES_PEP?.pepForm?.companyName ?? '',
        address: ONB_PHASES_PEP?.pepForm?.address ?? '',
        districtCode: ONB_PHASES_PEP?.pepForm?.districtCode ?? null,
        provinceCode: ONB_PHASES_PEP?.pepForm?.provinceCode ?? null,
        departmentCode: ONB_PHASES_PEP?.pepForm?.departmentCode ?? null,
        endDate: ONB_PHASES_PEP?.pepForm?.endDate ?? '',
        holdShare: ONB_PHASES_PEP?.pepForm?.holdShare.toString() ?? '',
      },
      relatives: ONB_PHASES_PEP?.relatives ?? [],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relatives',
  });

  const watchDepartment = watch('pepForm.departmentCode');

  const watchProvince = watch('pepForm.provinceCode');

  const watchIsPep = watch('isPep');

  const WatchIsRelativeAlive = watch('pepForm.isRelativeAlive');

  /**
   * Submit form
   */
  const onSubmit = async (data: any) => {
    const requestFormData = {
      currentPhaseCode: 'ONB_PHASES_PEP',
      onboardingUuId: onboardingUuId,
      request: {
        ...data,
        isPep: data.isPep.toLowerCase() === 'true',
        pepForm: {
          ...data.pepForm,
          isRelativeAlive: data.pepForm.isRelativeAlive.toLowerCase() === 'true',
          holdShare: data.pepForm.holdShare.toLowerCase() === 'true',
          endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
        },
      },
    };

    setLoadingScreen(true);
    customApi
      .post('/onboarding/pep', requestFormData)
      .then(() => {
        updateFormState('ONB_PHASES_PEP', requestFormData.request);
        inc();
      })
      .catch((error) => {
        setModalError({ title: 'Algo salio mal', description: 'Intentalo nuevamente' });
      })
      .finally(() => {
        setLoadingScreen(false);
      });
  };

  /**
   * Reset pepForm when ispep is false
   */
  useEffect(() => {
    if (watchIsPep !== '' && watchIsPep.toLowerCase() !== 'true') {
      reset({
        isPep: 'false',
        pepForm: {
          isRelativeAlive: '',
          position: '',
          companyName: '',
          address: '',
          districtCode: null,
          provinceCode: null,
          departmentCode: null,
          endDate: '',
          holdShare: '',
        },
        relatives: [],
      });
      remove();
      setHasParents(false);
    }
  }, [watchIsPep, hasParents]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    watchIsPep && setIsPep(watchIsPep.toLowerCase() === 'true');
    WatchIsRelativeAlive && setHasParents(WatchIsRelativeAlive.toLowerCase() === 'true');
  }, [watchIsPep, WatchIsRelativeAlive]);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  /**
   * Fecth departments catalog
   */
  useEffect(() => {
    const fetchDepartmentsCatalog = async () => {
      customApi
        .post('/catalogs/search', {
          catalogCode: 'GEO_LOCATION_LEVEL_ONE_CATALOG',
          parameters: [
            {
              code: 'COUNTRY_CODE',
              value: 'PER',
            },
            {
              code: 'GEO_TYPE_CODE',
              value: 'GEO_LOCATION_LEVEL_ONE',
            },
          ],
        })
        .then((response) => {
          updateCatalog(
            'departamentsCatalog',
            response.data.data.data.map((department: { value: string; code: string }) => ({
              text: department.value,
              value: department.code,
            }))
          );
        })
        .catch(() => {
          setModalError({ title: 'Algo salio mal', description: 'No pudimos cargar el listado de los departamentos' });
        });
    };
    {
      departamentsCatalog.length === 0 && fetchDepartmentsCatalog();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Fecth provinces catalog
   */
  useEffect(() => {
    const fetchProvincesCatalog = async () => {
      customApi
        .post('/catalogs/search', {
          catalogCode: 'GEO_LOCATION_LEVEL_TWO_CATALOG',
          parameters: [
            {
              code: 'COUNTRY_CODE',
              value: 'PER',
            },
            {
              code: 'GEO_TYPE_CODE',
              value: 'GEO_LOCATION_LEVEL_TWO',
            },
            {
              code: 'LOCATION_LEVEL_ONE',
              value: watchDepartment,
            },
          ],
        })
        .then((response) => {
          updateCatalog(
            'provincesCatalog',
            response.data.data.data.map((province: { value: string; code: string }) => ({
              text: province.value,
              value: province.code,
            }))
          );
        })
        .catch(() => {
          setModalError({ title: 'Algo salio mal', description: 'No pudimos cargar el listado de las provincias' });
        });
    };

    {
      provincesCatalog.length === 0 && fetchProvincesCatalog();
    }
  }, [watchDepartment]); //eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Fecth districts catalog
   */
  useEffect(() => {
    const fetchDistrictsCatalog = async () => {
      customApi
        .post('/catalogs/search', {
          catalogCode: 'GEO_LOCATION_LEVEL_THREE_CATALOG',
          parameters: [
            {
              code: 'COUNTRY_CODE',
              value: 'PER',
            },
            {
              code: 'GEO_TYPE_CODE',
              value: 'GEO_LOCATION_LEVEL_THREE',
            },
            {
              code: 'LOCATION_LEVEL_TWO',
              value: watchProvince,
            },
          ],
        })
        .then((response) => {
          updateCatalog(
            'districtsCatalog',
            response.data.data.data.map((district: { value: string; code: string }) => ({
              text: district.value,
              value: district.code,
            }))
          );
        })
        .catch(() => {
          setModalError({ title: 'Algo salio mal', description: 'No pudimos cargar el listado de los distritos' });
        });
    };

    {
      districtsCatalog.length === 0 && fetchDistrictsCatalog();
    }
  }, [watchProvince]); //eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Fecth DocumentTypes catalog
   */
  useEffect(() => {
    const fetchDocumentsCatalog = async () => {
      customApi
        .post('/catalogs/search', {
          catalogCode: 'DOCUMENTS_TYPE_CATALOG',
        })
        .then((response) => {
          updateCatalog(
            'documentTypesCatalog',
            response.data.data.data.map((documentType: { value: string; code: string }) => ({
              text: documentType.value,
              value: documentType.code,
            }))
          );
        })
        .catch(() => {
          setModalError({ title: 'Algo salio mal', description: 'No pudimos cargar los tipos de documentos' });
        });
    };

    {
      documentTypesCatalog.length === 0 && fetchDocumentsCatalog();
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
            {departamentsCatalog.length > 0 ? (
              <InputSelect
                name="pepForm.departmentCode"
                label="Departamento"
                options={departamentsCatalog}
                control={control}
                disableClearable
                onChange={() => {
                  updateCatalog('provincesCatalog', []);
                  updateCatalog('districtsCatalog', []);
                  setValue('pepForm.provinceCode', null);
                  setValue('pepForm.districtCode', null);
                }}
              />
            ) : (
              <InputSelect name="pepForm.departmentCode" label="Departamento" options={[]} disabled />
            )}
            {provincesCatalog.length > 0 ? (
              <InputSelect
                name="pepForm.provinceCode"
                label="Provincia"
                options={provincesCatalog}
                control={control}
                disableClearable
                onChange={() => {
                  updateCatalog('districtsCatalog', []);
                  setValue('pepForm.districtCode', null);
                }}
              />
            ) : (
              <InputSelect name="pepForm.provinceCode" label="Provincia" options={[]} disabled />
            )}
            {districtsCatalog.length > 0 ? (
              <InputSelect
                name="pepForm.districtCode"
                label="Distrito"
                options={districtsCatalog}
                control={control}
                disableClearable
              />
            ) : (
              <InputSelect name="pepForm.districtCode" label="Distrito" options={[]} disabled />
            )}
            <InputDatePicker
              name="pepForm.endDate"
              label="Fecha de salida"
              control={control}
              datePickerProps={{ disableFuture: true, minDate: minDate, maxDate: maxDate, yearsPerRow: 3 }}
            />

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
                name="pepForm.isRelativeAlive"
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

                  {documentTypesCatalog.length > 0 ? (
                    <InputSelect
                      name={`relatives.${index}.documentType`}
                      label="Tipo de documento"
                      options={documentTypesCatalog}
                      control={control}
                      disableClearable
                    />
                  ) : (
                    <InputSelect
                      name={`relatives.${index}.documentType`}
                      label="Tipo de documento"
                      options={[]}
                      disabled
                    />
                  )}
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
