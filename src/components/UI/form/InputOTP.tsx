import { ReactElement, ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { OutlinedInput, FormGroup, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function InputOTP(props: any) {
  const { length = 4 } = props;
  const Inputs: ReactElement[] = [];
  const inputsRef: Array<HTMLInputElement> = [];
  let inputIndex: number = -1;

  const theme = useTheme();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputIndex < length - 1 && e.target.value != '') {
      inputsRef[Number(inputIndex) + 1].focus();
    }
  };

  const paste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardContent = e.clipboardData.getData('Text').split('');

    if (clipboardContent.length > 0) {
      for (let i = inputIndex; i < length; i++) {
        if (clipboardContent[i]) {
          inputsRef[i].value = clipboardContent[i];
          inputsRef[i].focus();
        }
      }
    }
  };

  const keyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputIndex > 0) {
      inputsRef[Number(inputIndex) - 1].focus();
      inputsRef[inputIndex].select();
    }
  };

  for (let i = 0; i < length; i++) {
    Inputs.push(
      <OutlinedInput
        key={i}
        inputRef={(e) => {
          inputsRef.push(e);
        }}
        id={`${i}-opt`}
        sx={{
          width: 56,
          height: 56,
          '& .MuiInputBase-input': {
            textAlign: 'center',
            height: '48px',
            width: '48px',
            padding: '4px',
            fontSize: '24px',
          },
        }}
        inputProps={{ maxLength: 1, inputMode: 'numeric' }}
        onChange={change}
        onPaste={paste}
        onFocus={() => {
          inputIndex = i;
        }}
        onKeyUp={keyUp}
      />
    );
  }

  return (
    <FormGroup row>
      <Grid container rowSpacing={1}>
        {Inputs.map((e) => (
          <Grid item xs={1}>
            {e}
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}
