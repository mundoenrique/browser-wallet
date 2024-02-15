'use client';

import { Controller } from 'react-hook-form';
import Info from '@mui/icons-material/InfoOutlined';
import { FormControl, FormLabel, FormHelperText, Radio, FormControlLabel, RadioGroup, Box } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';
import { fuchsiaBlue } from '@/theme/theme-default';

function InputRadioMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, labelError, error, value, onChange, options, disabled, readOnly } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      {label && <FormLabel focused={false}>{label}</FormLabel>}
      <RadioGroup name={name} value={value} onChange={onChange} sx={{ display: 'flex', flexDirection: 'row' }}>
        {options.map((option, i: number) => (
          <Box
            key={i}
            sx={{
              bgcolor: value === option.value ? 'secondary.light' : 'transparent',
              borderRadius: 1,
              border: value === option.value ? `1px solid ${fuchsiaBlue[800]}` : 'none',
              height: 52,
              width: '100%',
            }}
          >
            <FormControlLabel
              value={option.value}
              control={<Radio disabled={disabled} readOnly={readOnly} id={name + option.value} />}
              label={option.text}
              sx={{ m: 'auto', width: '100%', height: 50 }}
            />
          </Box>
        ))}
      </RadioGroup>
      <FormHelperText
        sx={{ color: 'error.main', height: '20px', ml: 0, display: 'flex', alignItems: 'center' }}
        id={`${label}-helperText`}
      >
        {error ? (
          <>
            <Info fontSize="small" sx={{ mr: 1 }} /> {error.message}
          </>
        ) : (
          <>{labelError || ''}</>
        )}
      </FormHelperText>
    </FormControl>
  );
}

export default function InputRadios(props: InputOptionsProps) {
  const { name, control, onChange, options, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputRadioMUI
              name={name}
              value={field.value}
              options={options}
              onChange={(e) => {
                field.onChange(e);
                onChange && onChange(e);
              }}
              error={error}
              {...restProps}
            />
          )}
        />
      ) : (
        <InputRadioMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
