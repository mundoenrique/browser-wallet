'use client';

import { Controller } from 'react-hook-form';

import { FormControl, FormHelperText, Autocomplete, TextField, Box } from '@mui/material';
//Internal App
import { InputOptionsProps } from '@/interfaces';
import { useEffect, useMemo, useState } from 'react';

function AutocompleteMUI(props: InputOptionsProps): JSX.Element {
  const { name, label, options, labelError, error, value, onChange } = props;

  const textLabel = label ?? name;

  return (
    <FormControl error={!!error} variant="outlined" sx={{ mb: 2 }} fullWidth>
      <Autocomplete
        value={value}
        id={name}
        options={options}
        getOptionLabel={(option) => {
          const getData = options.find((obj) => (obj as any).value === option);
          return option.text ?? getData?.text;
        }}
        isOptionEqualToValue={(option) => {
          return option.value === value;
        }}
        onChange={onChange}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label={textLabel} />}
      />
      <FormHelperText sx={{ height: '20px' }}>{error ? error.message : labelError || ''}</FormHelperText>
    </FormControl>
  );
}

export default function InputSelect(props: InputOptionsProps) {
  const { name, control, onChange, options } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <AutocompleteMUI
                name={name}
                value={field.value}
                options={options}
                onChange={(e, data) => {
                  field.onChange(data?.value);
                  onChange && onChange(e, data);
                }}
                error={error}
              />
            );
          }}
        />
      ) : (
        <AutocompleteMUI name={name} onChange={onChange} options={options} />
      )}
    </>
  );
}
