'use client';

import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
//Internal App
import { SwitchListProps } from '@/interfaces';

function SwitchMUI(props: SwitchListProps): JSX.Element {
  const { name, onChange, value, label, disabled, checked } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <FormControlLabel
        value={value}
        label={label}
        name={name}
        disabled={disabled}
        checked={checked}
        control={<Switch focusVisibleClassName=".Mui-focusVisible" onChange={onChange} />}
      />
    </FormControl>
  );
}

export default function SwitchCheck(props: SwitchListProps) {
  const { name, control, onChange, ...restProps } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SwitchMUI
              name={name}
              value={field.value}
              checked={!field.value ? false : true}
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
        <SwitchMUI name={name} {...restProps} />
      )}
    </>
  );
}
