'use client';

import { useState } from 'react';
//Internal
import OTP from './partial/OTP';
import UpdatePass from './partial/UpdatePass';

export default function Recover() {
  const [otpValid, setOtpValid] = useState<boolean>(false);

  return <>{otpValid ? <UpdatePass /> : <OTP setOTP={setOtpValid} />}</>;
}
