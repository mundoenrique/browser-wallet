'use client';
import { Paper } from '@mui/material';
import Fade from '@mui/material/Fade';

export default function OnboardingStepper(props: { step: number; children: JSX.Element[] }) {
  const { step, children } = props;

  return <>{children[step]}</>;
}
