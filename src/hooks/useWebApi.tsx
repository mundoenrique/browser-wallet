import { useEffect } from 'react';
import { webApiSender, configureHeaders, handleRequest, handleResponse } from '@/utils/webApiConnect';
import { useJwtStore, useKeyStore } from '@/store';
import { api } from '@/utils/api';

export function WebApi() {
  const { jwsPrivateKey, jwsPublicKey, jwePrivateKey, jwePublicKey } = useKeyStore();
  const { jwt, setJwt } = useJwtStore();

  useEffect(() => {
    webApiSender.interceptors.request.use(
      async (request) => {
        let jwtToken = jwt;

        if (!jwtToken) {
          const response = await api.post('/gettoken', { jwePublicKey, jwsPublicKey });
          const token = response.data.data as string;
          setJwt(token);
          jwtToken = token;
        }

        request = configureHeaders(request, jwtToken);
        request = await handleRequest(request, jwsPrivateKey);

        return request;
      },
      (error) => {
        console.error('Error in request:', error);
        return Promise.reject(error);
      }
    );
    webApiSender.interceptors.response.use(
      async (response) => {
        return await handleResponse(response, jwePrivateKey);
      },
      (error) => {
        console.error('Error in request:', error);
        return Promise.reject(error);
      }
    );
  }, [jwePrivateKey, jwePublicKey, jwsPrivateKey, jwsPublicKey, jwt, setJwt]);

  return webApiSender;
}
