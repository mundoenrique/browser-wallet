'use client';

import { useEffect } from 'react';
//Internal app
import { verifyJWT } from '@/utils/jwt';
import { JWT_HEADER } from '@/utils/constants';
import { useJwtStore, useKeyStore } from '@/store';
import { api, setJwtToken, setprivateKeys } from '@/utils/api';

export function useApi() {
  const { jwt, setJwt } = useJwtStore();
  const { jwePrivateKey, jwsPrivateKey } = useKeyStore();

  return api;
}
