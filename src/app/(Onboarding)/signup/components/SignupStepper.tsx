'use client';

export default function SignupStepper(props: { step: number; children: JSX.Element[] }) {
  const { step, children } = props;

  return <>{children[step]}</>;
}
