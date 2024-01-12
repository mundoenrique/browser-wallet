'use client';

import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
//Internal App
import { SwitchListProps, SwitchMUIProps } from '@/interfaces';

function SwitchMUI(props: SwitchMUIProps): JSX.Element {
  const { name, settings, onChange, value } = props;

  return (
    <FormControl component="fieldset" variant="standard" fullWidth>
      <FormControlLabel
        value={value}
        label={settings.title}
        name={settings.name}
        checked
        disabled={settings.required}
        sx={{ mb: 0, pl: 2 }}
        control={<Switch id={name + settings.id} disabled={settings.required} checked={value} onChange={onChange} />}
      />
    </FormControl>
  );
}

export default function SwitchCheck(props: SwitchListProps) {
  const { name, control, onChange, options, setValue, ...restProps } = props;

  return (
    <>
      {control
        ? options.map((option, index) => (
            <Controller
              key={index}
              name={option.name}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <SwitchMUI
                  name={name}
                  value={field.value}
                  settings={option}
                  checked={field.value === true ? false : true}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(e);
                  }}
                  error={error}
                  {...restProps}
                />
              )}
            />
          ))
        : options.map((option, index) => <SwitchMUI key={index} name={name} settings={option} {...restProps} />)}
    </>
  );
}
