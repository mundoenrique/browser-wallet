'use client';

//Internal app
import { GradientContainer, NavExternal } from '@/components';

export default function SignupStepper(props: { step: number; children: JSX.Element[] }) {
  const { step, children } = props;

  return (
    <>
      <GradientContainer disable={step > 0}>
        <NavExternal image relative />
        {children[step]}
      </GradientContainer>
    </>
  );
}
