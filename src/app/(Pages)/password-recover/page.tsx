'use client';

import { useState } from 'react';
//Internal
import OTP from './components/OTP';
import UpdatePass from './components/UpdatePass';

export default function Recover() {
  const [otpValid, setOtpValid] = useState<boolean>(false);

  return <>{otpValid ? <UpdatePass /> : <OTP setOTP={setOtpValid} />}</>;
}
