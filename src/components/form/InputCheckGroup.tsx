'use client';

import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
//Internal app
import { OffCheck, OnCheck } from '%/Icons';
import { InputCheckGroupOptionProps, InputCheckGroupOptionsProps } from '@/interfaces';

export default function InputCheckGroup(props: Readonly<InputCheckGroupOptionsProps>): JSX.Element {
  const { name, options, onChange, defaultValue } = props;
  const [selectedValue, setSelectedValue] = useState(defaultValue ?? '');

  const handleCheckboxChange: (e: any) => void = (option: InputCheckGroupOptionProps) => {
    onChange && onChange(option);
    if (selectedValue === option.value) {
      setSelectedValue('');
    } else {
      setSelectedValue(option.value);
    }
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
        {name}:
      </Typography>
      <FormGroup sx={{ gap: 2 }}>
        {options.map((option: InputCheckGroupOptionProps, idx: number) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={selectedValue === option.value}
                icon={<OffCheck />}
                checkedIcon={<OnCheck />}
                onChange={() => handleCheckboxChange(option)}
              />
            }
            label={option.text}
            sx={{ alignItems: 'flex-start', '&>.MuiFormControlLabel-label': { fontSize: 14 }, mr: 0 }}
          />
        ))}
      </FormGroup>
    </>
  );
}
