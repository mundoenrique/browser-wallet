'use client';

export default function OnboardingStepper(props: { step: number; children: JSX.Element[] }) {
  const { step, children } = props;

  return <>{children[step]}</>;
}
